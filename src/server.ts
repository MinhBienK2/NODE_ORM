import 'module-alias/register';

require('dotenv').config();

import express, { Express, Request, Response } from 'express';
import bodyParser from 'body-parser';
import { createServer, Server as HttpServer } from 'http';

import viewEngine from './config/viewEngine';
import initWebRoutes from './route/web';
import connectDB from '@config/connectDB';
import { logger } from '@config/logger';

// Startup
(async function main() {
  try {
    const app: Express = express();

    logger.info('Initializing ORM connection...');
    connectDB();

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.get('/test-log', (req: Request, res: Response) => {
      logger.info('Loi ne', { isRequest: true, request: req });

      res.status(200).json({
        data: 'data ne',
      });
    });

    viewEngine(app);
    initWebRoutes(app);

    const port = process.env.PORT || 6969;

    app.listen(port, () => {
      //callback
      console.log('Backend Nodejs is runing on the port : ' + port);
    });
  } catch (err: any) {
    logger.error(err.stack);
  }
})();
