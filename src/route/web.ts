import express, { Express, Router } from 'express';
import homeController from '../controllers/homeController';

const router: Router = express.Router();

const initWebRoutes = (app: Express) => {
  router.get('/', homeController.getHomePage);
  router.get('/about', homeController.getAboutPage);

  return app.use('/', router);
};

export default initWebRoutes;
