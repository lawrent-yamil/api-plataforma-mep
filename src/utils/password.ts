import * as bc from 'bcrypt';

export const hashPassword = async (password: string): Promise<string> => {
  const salt = await bc.genSalt(10);
  return await bc.hash(password, salt);
};

export const comparePassword = async (
  password: string,
  receivedPassword: string,
): Promise<boolean> => {
  return await bc.compare(password, receivedPassword);
};
