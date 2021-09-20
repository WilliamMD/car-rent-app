"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Cart.belongsTo(models.User, { foreignKey: "UserId" });
      Cart.hasMany(models.LineItem);
    }
  }
  Cart.init(
    {
      created_on: DataTypes.DATE,
      status: DataTypes.STRING,
      UserId: DataTypes.INTEGER,
    },
    {
      hooks: {
        beforeCreate(cart, option) {
          cart.status = "open";
          cart.created_on = cart.createdAt;
        },
      },
      sequelize,
      modelName: "Cart",
    }
  );
  return Cart;
};
