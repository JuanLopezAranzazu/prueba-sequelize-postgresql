"use strict";

const { UserSchema, USER } = require("./../models/user.model");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn(USER, "role", UserSchema.role);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn(USER, "role");
  },
};
