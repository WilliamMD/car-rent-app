"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class LineItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      LineItem.belongsTo(models.Car, { foreignKey: "CarId" });
      LineItem.belongsTo(models.Cart, { foreignKey: "CartId" });
      LineItem.belongsTo(models.Order, { foreignKey: "order_name" });
    }
  }
  LineItem.init(
    {
      days: DataTypes.INTEGER,
      status: DataTypes.STRING,
      CarId: DataTypes.INTEGER,
      CartId: DataTypes.INTEGER,
      order_name: DataTypes.STRING,
    },
    {
      hooks: {
        beforeCreate(line_item, option) {
          line_item.status = "cart";
        },
      },
      sequelize,
      modelName: "LineItem",
    }
  );
  return LineItem;
};
