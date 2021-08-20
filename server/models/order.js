'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Order.belongsTo(models.User, {foreignKey: 'UserId'});
      Order.hasMany(models.LineItem);
    }
  };
  Order.init({
    order_name: DataTypes.STRING,
    created_on: DataTypes.DATE,
    discount: DataTypes.INTEGER,
    tax: DataTypes.INTEGER,
    total_due: DataTypes.INTEGER,
    total_days: DataTypes.INTEGER,
    payt_trx_number: DataTypes.STRING,
    city: DataTypes.STRING,
    address: DataTypes.STRING,
    status: DataTypes.STRING,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};