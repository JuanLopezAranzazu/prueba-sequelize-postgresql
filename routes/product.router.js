const express = require("express");
const productRouter = express.Router();
const jwt = require("jsonwebtoken");
const { config } = require("./../config/config");

const ProductService = require("./../services/product.service");
const productService = new ProductService();

const {
  createProductSchema,
  updateProductSchema,
  getProductSchema,
} = require("./../schemas/product.schema");
const validatorHandler = require("./../middleware/handleValidator");

const extractToken = (req, res, next) => {
  const authorization = req.get("authorization");
  let token = "";

  if (authorization && authorization.toLowerCase().startsWith("bearer")) {
    token = authorization.substring(7);
  }

  const decodedToken = jwt.verify(token, config.secretKey);

  if (!token || !decodedToken.id) {
    return res.status(401).json({ error: "token missing or invalid" });
  }

  console.log(decodedToken);
  const { id } = decodedToken;
  req.userId = id;
  next();
};

productRouter.get("/", extractToken, async (req, res, next) => {
  try {
    const products = await productService.getProducts();
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
});

productRouter.get(
  "/:id",
  extractToken,
  validatorHandler(getProductSchema, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const product = await productService.getProductById(id);
      res.status(200).json(product);
    } catch (error) {
      next(error);
    }
  }
);

productRouter.post(
  "/",
  extractToken,
  validatorHandler(createProductSchema, "body"),
  async (req, res, next) => {
    try {
      const { userId } = req;
      const { body } = req;
      const { name, price, stock } = body;
      console.log(userId, body);

      const dataForProduct = {
        name,
        price,
        stock,
        userId,
      };

      const savedProduct = await productService.createProduct(dataForProduct);
      res.status(201).json(savedProduct);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = productRouter;
