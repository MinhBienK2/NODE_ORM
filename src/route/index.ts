import express, { Express, Router } from 'express';
const swaggerUI = require('swagger-ui-express');

import userRouter from './user.route';
import authRouter from './auth.route';
import docs from 'docs';

const router: Router = express.Router();

const initWebRoutes = (app: Express) => {
  router.use('/auth', authRouter);
  router.use('/users', userRouter);

  app.use('/api/v1', router);

  app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(docs));

  return;
};

export default initWebRoutes;
