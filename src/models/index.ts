require('dotenv').config();
import Sequelize, { Model, ModelCtor } from 'sequelize';

const fs = require('fs');
const path = require('path');

import { sequelize } from '@config/connectDB';
import { IUsers } from './users';

const basename = path.basename(__filename);

interface DB {
  sequelize?: any;
  Sequelize?: any;
  Users?: ModelCtor<Model<IUsers>> & {
    associate?: (db: DB) => void;
  };
}

const db: DB = {};

fs.readdirSync(__dirname)
  .filter(file => {
    return file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.ts' && file.indexOf('.test.ts') === -1;
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  const model = db[modelName];

  if (model && typeof model.associate === 'function') {
    model.associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
