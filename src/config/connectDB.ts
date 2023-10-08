import mysql from 'mysql2';
import { sequelize, config } from '../models';

// create the connection to database
const connection = mysql.createConnection({
  host: config.host,
  user: config.username,
});

const connectDB = async () => {
  try {
    console.log(connection);
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

export default connectDB;
