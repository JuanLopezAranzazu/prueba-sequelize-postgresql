const Joi = require("joi");

const id = Joi.number().integer();
const name = Joi.string();
const price = Joi.number();
const stock = Joi.number().positive();

const createProductSchema = Joi.object({
  name: name.required(),
  price: price.required(),
  stock: stock.required(),
});

const updateProductSchema = Joi.object({
  name: name,
  price: price,
  stock: stock,
});

const getProductSchema = Joi.object({
  id: id.required(),
});

module.exports = {
  createProductSchema,
  updateProductSchema,
  getProductSchema,
};
