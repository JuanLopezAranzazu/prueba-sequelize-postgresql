const express = require("express");
const userRouter = express.Router();
const bcrypt = require("bcrypt");

const UserService = require("./../services/user.service.js");
const userService = new UserService();

const {
  createUserSchema,
  updateUserSchema,
  getUserSchema,
} = require("./../schemas/user.schema");
const validatorHandler = require("./../middleware/handleValidator");

userRouter.get("/", async (req, res, next) => {
  try {
    const users = await userService.getUsers();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
});

userRouter.get(
  "/:id",
  validatorHandler(getUserSchema, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await userService.getUserById(id);
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }
);

userRouter.post(
  "/",
  validatorHandler(createUserSchema, "body"),
  async (req, res, next) => {
    try {
      const { body } = req;
      const { name, email, password, role } = body;
      console.log(body);

      const saltRounds = 10;
      const passwordHash = await bcrypt.hash(password, saltRounds);

      const dataForUser = {
        name,
        email,
        password: passwordHash,
        role,
      };

      const savedUser = await userService.createUser(dataForUser);
      res.status(201).json(savedUser);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = userRouter;
