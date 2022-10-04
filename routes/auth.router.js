const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const authRouter = require("express").Router();

const UserService = require("./../services/user.service");
const userService = new UserService();

const { config } = require("./../config/config");
const { loginUserSchema } = require("./../schemas/auth.schema");
const validatorHandler = require("./../middleware/handleValidator");

authRouter.post(
  "/",
  validatorHandler(loginUserSchema, "body"),
  async (req, res) => {
    const { body } = req;
    const { email, password } = body;

    console.log(body);
    const user = await userService.getUserByEmail(email);

    const passwordCorrect =
      user === null ? false : await bcrypt.compare(password, user.password);

    if (!(user && passwordCorrect)) {
      res.status(401).json({
        error: "invalid user or password",
      });
    }

    const userForToken = {
      id: user.id,
      name: user.name,
    };

    const token = jwt.sign(userForToken, config.secretKey, {
      expiresIn: "1h",
    });

    res.send({
      name: user.name,
      token,
    });
  }
);

module.exports = authRouter;
