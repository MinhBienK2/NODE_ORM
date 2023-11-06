import express, { Express, Router } from 'express';

import userRouter from './user.route';
import authRouter from './auth.route';

const router: Router = express.Router();

const initWebRoutes = (app: Express) => {
  router.use('/auth', authRouter);
  router.use('/users', userRouter);

  return app.use('/api/v1', router);
};

export default initWebRoutes;
