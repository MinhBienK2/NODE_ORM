'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    return queryInterface.bulkInsert('Users', [
      {
        username: 'John',
        email: 'Doe',
        password: 'example@example.com',
        role: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: 'John',
        email: 'Doe',
        password: 'example@example.com',
        role: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: 'John',
        email: 'Doe',
        password: 'example@example.com',
        role: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: 'John',
        email: 'Doe',
        password: 'example@example.com',
        role: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
