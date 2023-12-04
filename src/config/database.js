require('dotenv').config();

const host = process.env.DB_HOST;
const username = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const database = process.env.DB_NAME;
const databaseTesting = process.env.DB_NAME_TEST;

module.exports = {
  development: {
    username,
    password,
    database,
    host,
    port: 3306,
    dialect: 'mysql',
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    query: {
      raw: true,
      mysql57: true,
    },
    logging: false,
  },
  test: {
    username,
    password,
    host,
    database: databaseTesting,
    dialect: 'mysql',
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    query: {
      raw: true,
      mysql57: true,
    },
    logging: false,
  },
  production: {
    username: 'root',
    password: null,
    database: 'database_production',
    host: '127.0.0.1',
    dialect: 'mysql',
  },
};
