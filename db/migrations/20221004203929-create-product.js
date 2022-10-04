'use strict';

const { PRODUCT, ProductSchema } = require("./../models/product.model");

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(PRODUCT, ProductSchema);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.drop(PRODUCT);
  }
};
