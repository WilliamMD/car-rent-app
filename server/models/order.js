"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Order.belongsTo(models.User, { foreignKey: "UserId" });
      Order.hasMany(models.LineItem, { foreignKey: "order_name" });
    }
  }
  Order.init(
    {
      order_name: { type: DataTypes.STRING, primaryKey: true },
      created_on: DataTypes.DATE,
      discount: DataTypes.INTEGER,
      tax: DataTypes.INTEGER,
      total_due: DataTypes.INTEGER,
      total_days: DataTypes.INTEGER,
      payt_trx_number: DataTypes.STRING,
      city: DataTypes.STRING,
      address: DataTypes.STRING,
      status: DataTypes.STRING,
      UserId: DataTypes.INTEGER,
    },
    {
      hooks: {
        beforeCreate(order, option) {
          order.payt_trx_number = `TRX-${Math.random().toString(36).slice(2)}`;
          order.status = null;
          order.created_on = new Date();
          if (order.total_days > 2) {
            order.discount = order.total_due * order.total_days * 0.15;
          } else {
            order.discount = 0;
          }
          order.tax = order.total_days * order.total_due * 0.1;

          order.total_due = order.total_due * order.total_days;
          order.total_due = order.total_due - order.discount + order.tax;
        },
        beforeBulkUpdate(order, option) {
          // if (order.total_days > 2) {
          //   order.setDataValue("discount", order.total_due * 0.15);
          // } else {
          //   order.setDataValue("discount", 0);
          // }
          // order.setDataValue("tax", 0.1 * order.total_due);
          // order.setDataValue(
          //   "total_due",
          //   order.total_due - order.discount + order.tax
          // );
        },
      },
      sequelize,
      modelName: "Order",
    }
  );
  return Order;
};
