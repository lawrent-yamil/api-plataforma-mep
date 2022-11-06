import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../types/User';

export const login = (req: Request<User>, res: Response) => {
  const { email, password } = req.body;

  /* Hacer busqueda en la base de datos */
  const user: User = {
    email: 'admin',
    password: 'admin',
  };

  if (email === user.email && password === user.password) {
    const token = jwt.sign({ email: user.email }, 'secretkey', {
      expiresIn: '1h',
    });
    return res.json({ token });
  } else {
    return res.status(401).json({ message: 'Email o contraseña incorrectos' });
  }
};
