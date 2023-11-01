import logger from '@config/logger';
import * as redis from 'redis';

export const redisClient = redis.createClient({
  password: 'minhbien123',
});

export const connectCache = async () => {
  try {
    redisClient.on('error', function (err) {
      logger.info('Could not establish a connection with redis. ' + err);
    });
    redisClient.on('connect', function (err) {
      logger.info('Connected to redis successfully');
    });
  } catch (error) {
    logger.error('redis - ', error);
  }
};
