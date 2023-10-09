// import mysql from 'mysql2';
// const { Sequelize } = require('sequelize');
// import { config } from '@models/index';

// const sequelize = new Sequelize('test', 'root', 'minhbien123', {
//   host: 'localhost',
//   dialect: 'mysql',
// });

const connectDB = async () => {
  try {
    // console.log('sequanline ', sequelize);
    // await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

export default connectDB;
