'use strict';
const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface: any, Sequelize: any) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    const password = await bcrypt.hash('ademin', 10); 
    return queryInterface.bulkInsert('users', [{
      email: 'firhangael1525@gmail.com',
      password: password,
      role: "admin",
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  async down (queryInterface: any, Sequelize: any) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('Users', null, {});
  }
};
