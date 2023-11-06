import { NextFunction, Request, Response } from 'express';

import { Users } from '@models/users';

const CatchAsync =
  (fn: (req: Request & { user?: { [key: string]: any } }, res: Response, next: NextFunction) => Promise<any>) =>
  (req: Request, res: Response, next: NextFunction): Promise<any> => {
    return fn(req, res, next).catch(next);
  };

export default CatchAsync;
