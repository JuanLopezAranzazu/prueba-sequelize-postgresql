const { Model, DataTypes, Sequelize } = require("sequelize");
const USER = "user";

const UserSchema = {
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
  email: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true,
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true,
  },
  role: {
    allowNull: false,
    type: DataTypes.STRING,
    defaultValue: "customer",
  },
  created_at: {
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
  },
};

class User extends Model {
  static associate(models) {
    this.hasMany(models.Product, {
      foreignKey: "userId",
      as: "products",
    });
  }
  static config(sequelize) {
    return {
      sequelize,
      tableName: USER,
      modelName: "User",
      timestamps: false,
    };
  }
}

module.exports = { USER, UserSchema, User };
