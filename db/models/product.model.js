const { Model, DataTypes, Sequelize } = require("sequelize");
const PRODUCT = "product";
const { USER } = require("./user.model");

const ProductSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true,
  },
  price: {
    allowNull: false,
    type: DataTypes.DECIMAL,
  },
  stock: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  created_at: {
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
  },
  userId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: USER,
      key: "id"
    },
    onUpdate: "CASCADE",
    onDelete: "SET NULL"
  }
};

class Product extends Model {
  static associate(models) {
    this.belongsTo(models.User, {
      foreignKey: "userId",
      as: "user"
    });
  }
  static config(sequelize) {
    return {
      sequelize,
      tableName: PRODUCT,
      modelName: "Product",
      timestamps: false,
    };
  }
}

module.exports = { PRODUCT, ProductSchema, Product };
