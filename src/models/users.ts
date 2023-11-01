import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  Optional,
  DataTypes,
  ForeignKey,
  ModelScopeOptions,
  ModelValidateOptions,
} from 'sequelize';

import { sequelize } from '@config/connectDB';

export interface UsersAttributes {
  id: string;
  username: string;
  email: string;
  password: string;
  role: number;
}

export interface UsersCreationAttributes extends Optional<UsersAttributes, 'id'> {}

const RepositoryDefinition = {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  username: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, unique: true, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
  role: { type: DataTypes.INTEGER, allowNull: false },
};

export class Users extends Model<UsersAttributes, UsersCreationAttributes> implements UsersAttributes {
  declare id: string;
  declare username: string;
  declare email: string;
  declare password: string;
  declare role: number;
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) {
    // define association here
  }

  static readonly scopes: ModelScopeOptions = {
    /*
        nơi khai báo scope
      */
  };

  static readonly validations: ModelValidateOptions = {
    /*
        where validation is declared
      */
  };
}
Users.init(RepositoryDefinition, {
  sequelize,
  modelName: 'Users',
  updatedAt: true, // default add the field updated_at
  createdAt: true, // and created_at
  scopes: Users.scopes,
  validate: Users.validations,
});
