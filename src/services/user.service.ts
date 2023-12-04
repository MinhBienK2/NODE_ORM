import bcrypt from 'bcrypt';

import { Users, UsersAttributes } from '@models/users';
import ApiError from '@utils/ApiError';

const saltRounds = 10;
const someOtherPlaintextPassword = 'not_bacon';

export const hashPassword = async password => {
  return bcrypt.hash(password, saltRounds);
};

export const isEmailExists = async (email: string): Promise<boolean> => {
  const user = await Users?.findOne({ where: { email } });
  if (user) return true;

  return false;
};

export const handleCreateUser = async (body: Omit<UsersAttributes, 'id'>): Promise<any> => {
  try {
    const newPassword = await hashPassword(body.password);

    const newUser = await Users?.create({
      username: body.username,
      email: body.email,
      password: newPassword,
      role: body.role,
    });
    return newUser;
  } catch (error) {
    if (error) {
      console.log(error);
    }
  }
};

export const handleGetUserById = async (userId: string) => {
  try {
    const data = await Users.findOne({
      where: {
        id: userId,
      },
    });

    return data;
  } catch (error) {
    console.log(error);
    throw new ApiError('Error', 400);
  }
};

export const handleDeleteUserById = async (userId: string) => {
  try {
    return await Users.destroy({
      where: {
        id: userId,
      },
    });
  } catch (error) {
    throw new ApiError(`Error: ${error}`, 400);
  }
};

export const isUUIDV4 = (str: string): boolean => {
  const pattern = /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i;
  return pattern.test(str);
};
