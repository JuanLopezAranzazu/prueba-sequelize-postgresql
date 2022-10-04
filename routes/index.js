const userRouter = require("./user.router");
const authRouter = require("./auth.router");
const productRouter = require("./product.router");

function routes(app) {
  app.use("/api/v1/users", userRouter);
  app.use("/api/v1/auth", authRouter);
  app.use("/api/v1/products", productRouter);
}

module.exports = routes;
