import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { pool } from "../config";
import { User } from "../types/User";

export const login = async (req: Request<User>, res: Response) => {
  const { email, password } = req.body;
  try {
    // Selecct the user from the database
    const user = await pool.query("SELECT * FROM tb_users WHERE email = $1", [
      email,
    ]);

    // Check if the user exists
    if (!user.rows[0]) {
      return res.status(401).json("Email or passwor doesn't match");
    }

    // Check if the password is correct
    if (password !== user.rows[0].password) {
      return res.status(401).json("Email or password is incorrect");
    }

    // Generate the token with the email and password
    const token = jwt.sign(
      { email: user.rows[0]?.email, password: user.rows[0]?.password },
      "secret"
    );

    // Send the token to the client
    return res.json({ token });
  } catch (err: any) {
    console.error(err?.message);
  }
};
