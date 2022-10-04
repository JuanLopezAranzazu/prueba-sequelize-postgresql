const { User, UserSchema } = require("./user.model.js");
const { Product, ProductSchema } = require("./product.model");

function models(sequelize) {
  User.init(UserSchema, User.config(sequelize));
  Product.init(ProductSchema, Product.config(sequelize));
  User.associate(sequelize.models);
  Product.associate(sequelize.models);
}

module.exports = models;
