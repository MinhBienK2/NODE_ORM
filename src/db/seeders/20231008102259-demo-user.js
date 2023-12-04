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
        id: 'edc19512-4f78-4e76-a838-e0bb8b16b51c',
        username: 'Bien',
        email: 'phamminhbien333@gmail.com',
        password: '$2b$10$32TXOq44VjMsY7x/rhExeuzpsLDDi053Ad5x5Jqu.b.R09u6/r0OK',
        role: 0,
        createdAt: 1699605324524,
        updatedAt: 1699605324524,
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
