'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
require('module-alias/register');
const express_1 = __importDefault(require('express'));
const body_parser_1 = __importDefault(require('body-parser'));
const viewEngine_1 = __importDefault(require('./config/viewEngine'));
const web_1 = __importDefault(require('./route/web'));
// import connectDB from '@config/connectDB';
require('dotenv').config();
const app = (0, express_1.default)();
// connectDB();
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
(0, viewEngine_1.default)(app);
(0, web_1.default)(app);
const port = process.env.PORT || 6969;
app.listen(port, () => {
  //callback
  console.log('Backend Nodejs is runing on the port : ' + port);
});
