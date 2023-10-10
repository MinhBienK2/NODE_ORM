"use strict";
// import mysql from 'mysql2';
// const { Sequelize } = require('sequelize');
// import { config } from '@models/index';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
// const sequelize = new Sequelize('test', 'root', 'minhbien123', {
//   host: 'localhost',
//   dialect: 'mysql',
// });
const connectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // console.log('sequanline ', sequelize);
        // await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    }
    catch (error) {
        console.error('Unable to connect to the database:', error);
    }
});
exports.default = connectDB;
