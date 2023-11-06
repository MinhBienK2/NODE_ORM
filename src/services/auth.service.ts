import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { promisify } from 'util';

import { Users, UsersAttributes } from '@models/users';
import { hashPassword } from './user.service';
import { redisClient } from '@utils/redis';

type PayloadRefreshToken = {
  id: string;
  iat: number;
  exp: number;
};

export const findUserByEmail = async email => {
  return await Users.findOne({ where: { email } });
};

export const comparePassword = async (password, currentPassword): Promise<boolean> => {
  return await bcrypt.compare(password, currentPassword);
};

export const checkRefreshTokenExist = async (userId: string): Promise<string | null> => {
  const SCAN_CURSOR = 0;
  const pattern = `user:${userId}:refresh*`;
  const SCAN_TYPE = 'string';
  const SCAN_COUNT = 1;

  const cursorScan = await redisClient.scan(SCAN_CURSOR, {
    MATCH: pattern,
    COUNT: SCAN_COUNT,
    TYPE: SCAN_TYPE,
  });

  if (cursorScan.keys.length !== 0) {
    const redisRefreshToken = cursorScan.keys[0];
    const token = redisRefreshToken.split('->')[1];

    if (token) return token;
  }

  return null;
};

export const refreshTokenCorrect = async (
  redisPrefix: string,
  token: string,
  secretOrPrivateKey: jwt.Secret,
): Promise<PayloadRefreshToken | null> => {
  const decoded: PayloadRefreshToken = await promisify(jwt.verify)(token, secretOrPrivateKey);
  const key = `${redisPrefix}->${token}`;
  // Check to see if this token is available on redis
  const redisRecord = await redisClient.get(key);
  // If not, the token has been destroyed
  if (!redisRecord) return null;
  return decoded;
};
