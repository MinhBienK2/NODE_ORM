import bcrypt from 'bcrypt';
import db from '@models/index';

export const findUserByEmail = async email => {
  return await db.Users?.findOne({ where: { email } });
};

export const comparePassword = async (password, currentPassword): Promise<boolean> => {
  return await bcrypt.compare(password, currentPassword);
};
