import { UsersAttributes } from './../models/users';
import { sequelize } from '@config/connectDB';
import { QueryTypes } from 'sequelize';

import CatchAsync from '../utils/CatchAsync';
import ApiError from '@utils/ApiError';
import jwt from 'jsonwebtoken';
import JwtRedis from '@utils/jwtRedis';
import { redisClient } from '@utils/redis';

interface Decode extends UsersAttributes {
  id: string;
  iat: number;
  exp: number;
}

const getUser = async (userId: string): Promise<{ [key: string]: any } | undefined> => {
  const CACHE_KEY: string = `user:${userId}`;

  const cacheUser = await redisClient.hGetAll(CACHE_KEY);
  if (!cacheUser) {
    const query = `SELECT username, email, role, updatedAt, createdAt FROM Users WHERE id = '${userId}'`;
    const user = await sequelize.query(query, { type: QueryTypes.SELECT });

    // add cache
    const addUser = await redisClient.hSet(CACHE_KEY, user);
    if (addUser) return user;
    return undefined;
  }

  return cacheUser;
};

export const protect = CatchAsync(async (req, res, next) => {
  let token: string | undefined;
  const authorization = req.headers.authorization;
  if (authorization?.startsWith('Bearer')) {
    token = req?.headers?.authorization?.split(' ')[1];
  }
  if (!token) return next(new ApiError('You are not logged in', 401));

  const jwtRedis = new JwtRedis('user:token');
  const decoded: Decode = await jwtRedis.verify(token, process.env.JWT_SECRET);

  const user = await getUser(decoded.id);
  console.log(user);
  req.user = user;

  next();
});

export const restrict = (...role) =>
  CatchAsync(async (req, res, next) => {
    const trict = role.includes(req?.user?.role);
    if (!trict) return next(new ApiError('User does not have permission !', 400));
    next();
  });
