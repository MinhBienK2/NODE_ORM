import { Request } from 'express';
import { QueryTypes } from 'sequelize';

import { Users, UsersAttributes } from '@models/users';
import { userService } from '@services/index';
import { handleGetUserById, isEmailExists } from '@services/user.service';
import { comparePassword, findUserByEmail, checkRefreshTokenExist, refreshTokenCorrect } from '@services/auth.service';
import CatchAsync from '@utils/CatchAsync';
import ApiError from '@utils/ApiError';
import JwtRedis from '@utils/jwtRedis';
import { sequelize } from '@config/connectDB';

interface CustomBodyRequest<T> extends Request {
  body: T;
}

const PREFIX_TOKEN = 'user:token';

export const login = CatchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  const user: Partial<Users> | null = await findUserByEmail(email);
  if (!user) return next(new ApiError('Email dose not exist', 400));

  const isPasswordValid = await comparePassword(password, user.password);
  if (!isPasswordValid) return next(new ApiError('Incorrect password', 400));

  const JwtRedisToken = new JwtRedis(PREFIX_TOKEN);
  const token = await JwtRedisToken.sign(
    {
      id: user.id,
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_ACCESS_EXPIRATION },
  );

  let refreshToken: string | null;
  refreshToken = await checkRefreshTokenExist(user?.id as string);

  if (!refreshToken) {
    const PREFIX_REFRESH_TOKEN = `user:${user.id}:refresh`;
    const JwtRedisRefreshToken = new JwtRedis(PREFIX_REFRESH_TOKEN);
    refreshToken = await JwtRedisRefreshToken.signRefresh(
      {
        id: user.id,
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_REFRESH_EXPIRATION },
    );
  }

  // remove password
  delete user['password'];

  res.status(200).json({
    data: {
      token,
      refreshToken,
      user,
    },
  });
});

export const register = CatchAsync(async (req, res, next) => {
  const body: Omit<UsersAttributes, 'id'> = req.body;
  body.role = 0;

  const checkEmailExists = await isEmailExists(body.email);
  if (checkEmailExists) {
    return next(new ApiError('Email had exists', 401));
  }

  const user = await userService.handleCreateUser(body);
  if (!user) return next(new ApiError('Create fail!', 401));

  return res.status(201).json({
    status: 'success',
    message: 'Create success',
  });
});

export const logout = CatchAsync(async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) return next(new ApiError('Token is required', 400));

  const jwtRedis = new JwtRedis(PREFIX_TOKEN);
  const tokenHasBeenDestroyed = await jwtRedis.destroy(token);

  if (!tokenHasBeenDestroyed) return next(new ApiError('Logout fail', 400));

  return res.status(200).json({
    status: 'success',
    message: 'Logout success',
  });
});

export const refreshToken = CatchAsync(async (req: CustomBodyRequest<{ refreshToken; userId }>, res, next) => {
  const { refreshToken, userId } = req.body;
  if (!refreshToken && userId) return next(new ApiError('Refresh token and User Id is required', 400));

  const PREFIX_REFRESH_TOKEN = `user:${userId}:refresh`;
  const decode = await refreshTokenCorrect(PREFIX_REFRESH_TOKEN, refreshToken, process.env.JWT_SECRET);
  if (!decode) return next(new ApiError('Refresh token fail', 400));

  const JwtRedisToken = new JwtRedis(PREFIX_TOKEN);
  const token = await JwtRedisToken.sign(
    {
      id: userId,
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_ACCESS_EXPIRATION },
  );

  res.status(200).json({
    data: {
      token,
      refreshToken,
    },
  });
});
