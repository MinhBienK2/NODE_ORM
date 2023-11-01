import bcrypt from 'bcrypt';

import db from '@models/index';
import { IUsers } from '@models/users';
import ApiError from '@utils/ApiError';

const saltRounds = 10;
const someOtherPlaintextPassword = 'not_bacon';

export const hashPassword = async password => {
  return bcrypt.hash(password, saltRounds);
};

export const isEmailExists = async (email: string): Promise<boolean> => {
  const user = await db.Users?.findOne({ where: { email } });
  if (user) return true;

  return false;
};

export const handleCreateUser = async (body: IUsers): Promise<any> => {
  try {
    const newPassword = await hashPassword(body.password);

    const newUser = await db.Users?.create({
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
    const data = await db.Users?.findOne({
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
    return await db.Users?.destroy({
      where: {
        id: userId,
      },
    });
  } catch (error) {
    throw new ApiError(`Error: ${error}`, 400);
  }
};
