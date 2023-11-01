import { redisClient } from './redis';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
const promisify = require('util').promisify;

export default class JwtRedis {
  private readonly redisPrefix: string;

  constructor(prefix: string) {
    this.redisPrefix = prefix;
  }

  async sign<T extends object & { redisId?: string }>(
    payload: T,
    secretOrPrivateKey: jwt.Secret,
    options?: jwt.SignOptions,
  ): Promise<string> {
    // create uuid
    payload.redisId = uuidv4();
    const token = await promisify(jwt.sign(payload, secretOrPrivateKey, options));
    const decoded: any = await promisify(jwt.decode(token));
    // Combine prefix and uuid to make the redis key corresponding to the current token
    const key = `${this.redisPrefix}_${decoded.redisId}`;
    // If this token has an expiration time, set the TTL for the key
    if (decoded.exp) {
      const now = Date.now();
      const duration = Math.floor(decoded.exp - now / 1000);
      if (duration > 0) {
        await redisClient.setEx(key, duration, 'true');
      }
      // Không thì cứ lưu nó đấy cho đến khi mình destroy thì thôi
    } else {
      await redisClient.set(key, 'true');
    }
    return token;
  }

  async verify(token: string, secretOrPrivateKey: jwt.Secret) {
    const decoded: any = await promisify(jwt.verify(token, secretOrPrivateKey));
    const key = `${this.redisPrefix}_${decoded.redisId}`;
    // Check to see if this token is available on redis
    const redisRecord = await redisClient.get(key);
    // If not, the token has been destroyed
    if (!redisRecord) throw new Error('Token destroyed!');
    return decoded;
  }

  // To cancel the token, I just need to delete the corresponding key on redis
  destroy = (token: string): Promise<number> => {
    const decoded: any = jwt.decode(token);
    const key = `${this.redisPrefix}_${decoded.redisId}`;
    return redisClient.del(key);
  };
}
