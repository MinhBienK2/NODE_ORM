const Sequelize = require('sequelize');
import mysql from 'mysql2/promise';
import logger from './logger';
import { Users } from '@models/users';

const env = process.env.NODE_ENV || 'test';
const config = require(__dirname + '/../config/database.js')[env];

let sequelize;
let connectMysql;

if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

const connectDBTesting = async () => {
  try {
    connectMysql = await mysql.createConnection({
      host: config.host,
      port: config.port,
      user: config.username,
      password: config.password,
    });
    await connectMysql.query(`CREATE DATABASE IF NOT EXISTS \`${config.database}\`;`);

    await sequelize.sync();
    await sequelize.authenticate();

    logger.info('Connection has been established successfully.');
  } catch (error) {
    logger.error('Unable to connect to the database:', error);
  }
};

const closeDBTesting = async () => {
  sequelize.close();
  connectMysql.end();
};

export { sequelize, closeDBTesting, connectDBTesting };
