import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { pool } from '../config';
import { User } from '../types/User';
import { comparePassword, hashPassword } from '../utils/password';

export async function login(
  req: Request<User>,
  res: Response,
): Promise<Response<any, Record<string, any>> | undefined> {
  const { email, password } = req.body;
  try {
    // Selecct the user from the database
    const user = await pool.query('SELECT * FROM tb_users WHERE email = $1', [
      email,
    ]);

    // Check if the user exists
    if (!user.rows[0]) {
      return res.status(401).json("Email or passwor doesn't match"); 
    }

    // Check if the password is correct
    const validPassword = await comparePassword(
      password,
      user.rows[0].password,
    );

    if (!validPassword) {
      return res.status(401).json("Email or passwor doesn't match");
    }

    // Create a token email and password
    const token = jwt.sign(
      {
        email: user.rows[0].email,
        password: user.rows[0].password,
      },
      'tokentest',
    );

    // Return the token
    return res.status(200).json({ token });
  } catch (err: any) {
    console.error(err?.message);
  }
}

export async function signup(
  req: Request<User>,
  res: Response,
): Promise<Response<any, Record<string, any>> | undefined> {
  const { email, password } = req.body;
  try {
    // Selecct the user from the database
    const user = await pool.query('SELECT * FROM tb_users WHERE email = $1', [
      email,
    ]);

    // Check if the user exists
    if (user.rows[0]) {
      return res.status(401).json('User already exists');
    }

    // Hash the password
    const hashedPassword = await hashPassword(password);

    // Insert the user into the database
    await pool.query(
      'INSERT INTO tb_users (email, password) VALUES ($1, $2) RETURNING *',
      [email, hashedPassword],
    );

    // Generate the token with the email and password
    const token = jwt.sign({ email, hashedPassword }, 'secret');

    // Send the token to the client
    return res.json({ token });
  } catch (err: any) {
    console.error(err?.message);
  }
}
