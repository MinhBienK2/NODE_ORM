import { NextFunction, Request, Response } from 'express';

const CatchAsync =
  (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) =>
  (req: Request, res: Response, next: NextFunction): Promise<any> => {
    return fn(req, res, next).catch(next);
  };

export default CatchAsync;
