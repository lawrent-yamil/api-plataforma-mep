import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../types/User';

export const login = (req: Request<User>, res: Response) => {
  const { email, password } = req.body;

  /* Hacer busqueda en la base de datos */

  if (email === 'admin' && password === 'admin') {
    const token = jwt.sign({ email }, 'secretKey', {
      expiresIn: '1h',
    });
    return res.json({ token });
  } else {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
};
