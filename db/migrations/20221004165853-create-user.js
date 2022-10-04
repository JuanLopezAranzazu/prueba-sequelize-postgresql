"use strict";

const { UserSchema, USER } = require("./../models/user.model");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(USER, UserSchema);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.drop(USER);
  },
};
