const Joi = require("joi");

const id = Joi.number().integer();
const name = Joi.string();
const email = Joi.string();
const password = Joi.string().min(8).max(8);

const createUserSchema = Joi.object({
  name: name.required(),
  email: email.required(),
  password: password.required(),
});

const updateUserSchema = Joi.object({
  name: name,
  email: email,
  password: password,
});

const getUserSchema = Joi.object({
  id: id.required(),
});

module.exports = {
  createUserSchema,
  updateUserSchema,
  getUserSchema,
};
