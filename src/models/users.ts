import { Model, InferAttributes, InferCreationAttributes, DataTypes, ForeignKey } from 'sequelize';

export interface IUsers {
  id: string;
  username: string;
  email: string;
  password: string;
  role: number;
}

module.exports = (sequelize, DataTypes) => {
  class Users extends Model<InferAttributes<Users>, InferCreationAttributes<Users>> {
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
  }
  Users.init(
    {
      id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
      username: { type: DataTypes.STRING, allowNull: false },
      email: { type: DataTypes.STRING, unique: true, allowNull: false },
      password: { type: DataTypes.STRING, allowNull: false },
      role: { type: DataTypes.INTEGER, allowNull: false },
    },
    {
      sequelize,
      modelName: 'Users',
    },
  );
  return Users;
};
