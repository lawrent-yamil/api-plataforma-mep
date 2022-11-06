import { Request, Response } from 'express';

export const login = (req: Request, res: Response) => {
  return res.json({ message: 'you have been logged' });
};
