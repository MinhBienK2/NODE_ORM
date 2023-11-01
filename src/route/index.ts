import express, { Express, Router } from 'express';

import userRouter from './user.route';
import authRouter from './auth.route';

const router: Router = express.Router();

const initWebRoutes = (app: Express) => {
  router.use('/users', userRouter);
  router.use('/auth', authRouter);

  return app.use('/api/v1', router);
};

export default initWebRoutes;
