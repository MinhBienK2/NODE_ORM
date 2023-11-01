require('dotenv').config();

import express, { Express, Request, Response } from 'express';
import bodyParser from 'body-parser';

import viewEngine from './config/viewEngine';
import initWebRoutes from './route';
import connectDB from '@config/connectDB';
import logger from '@config/logger';
import ApiError from '@utils/ApiError';
import handleError from '@middlewares/error.middleware';
import { connectCache } from '@utils/redis';

// Startup
(async function main() {
  try {
    const app: Express = express();

    connectDB();
    connectCache();

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    viewEngine(app);
    initWebRoutes(app);

    // handle not foud
    app.all('*', (req, res, next) => {
      next(new ApiError(`Can not find ${req.originalUrl} on this server ! `, 404));
    });
    //handle error
    app.use(handleError);

    const port = process.env.PORT || 6969;

    app.listen(port, () => {
      logger.info('Backend Nodejs is runing on the port : ' + port);
    });
  } catch (err: any) {
    logger.error(err.stack);
  }
})();
