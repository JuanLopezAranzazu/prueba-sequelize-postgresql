const { models } = require("../libs/sequelize");

class ProductService {
  constructor() {}

  async getProducts() {
    const response = await models.Product.findAll({
      include: [{ model: models.User, as: "user" }],
    });
    return response;
  }

  async getProductById(productId) {
    const response = await models.Product.findByPk(productId, {
      include: [{ model: models.User, as: "user" }],
    });
    return response;
  }

  async createProduct(dataForProduct) {
    const response = await models.Product.create(dataForProduct);
    return response;
  }
}

module.exports = ProductService;
