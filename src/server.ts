import express, { Express } from 'express';
import bodyParser from 'body-parser';
import viewEngine from './config/viewEngine';
import initWebRoutes from './route/web';
require('dotenv').config();

const app: Express = express();

//config app

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

viewEngine(app);
initWebRoutes(app);

const port = process.env.PORT || 6969;

app.listen(port, () => {
  //callback
  console.log('Backend Nodejs is runing on the port : ' + port);
});
