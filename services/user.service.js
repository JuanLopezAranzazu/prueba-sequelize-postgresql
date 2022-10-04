const { models } = require("../libs/sequelize");

class UserService {
  constructor() {}

  async getUsers() {
    const response = await models.User.findAll({
      include: [{ model: models.Product, as: "products" }],
    });
    return response;
  }

  async getUserByEmail(email) {
    const response = await models.User.findOne({
      where: { email },
    });
    return response;
  }

  async getUserById(userId) {
    const response = await models.User.findByPk(userId, {
      include: [{ model: models.Product, as: "products" }],
    });
    return response;
  }

  async createUser(dataForUser) {
    const response = await models.User.create(dataForUser);
    return response;
  }
}

module.exports = UserService;
