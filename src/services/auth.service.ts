import bcrypt from 'bcrypt';
import { Users } from '@models/users';

export const findUserByEmail = async email => {
  return await Users.findOne({ where: { email } });
};

export const comparePassword = async (password, currentPassword): Promise<boolean> => {
  return await bcrypt.compare(password, currentPassword);
};
