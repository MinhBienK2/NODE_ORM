'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.DataTypes.UUIDV4,
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      role: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.BIGINT({ length: 13 }), // Kiểu dữ liệu DATE với precision 6 để lưu trữ milliseconds
        allowNull: true,
      },
      updatedAt: {
        type: Sequelize.BIGINT({ length: 13 }), // Kiểu dữ liệu DATE với precision 6 để lưu trữ milliseconds
        allowNull: true,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  },
};
