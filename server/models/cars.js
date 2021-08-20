'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Car extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Car.belongsTo(models.User, {foreignKey: 'UserId'});
      Car.hasMany(models.CarsComment)
      Car.hasMany(models.CarsImage)
      Car.hasMany(models.LineItem)
    }
  };
  Car.init({
    nama: DataTypes.STRING,
    harga_sewa: DataTypes.INTEGER,
    penumpang: DataTypes.INTEGER,
    bagasi: DataTypes.BOOLEAN,
    pintu: DataTypes.INTEGER,
    ac: DataTypes.BOOLEAN,
    type: DataTypes.STRING,
    description: DataTypes.STRING,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Car',
  });
  return Car;
};