'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CarsImage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      CarsImage.belongsTo(models.Car, {foreignKey: 'CarId'});
    }
  };
  CarsImage.init({
    filename: DataTypes.STRING,
    filesize: DataTypes.STRING,
    filetype: DataTypes.STRING,
    primary: DataTypes.BOOLEAN,
    CarId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'CarsImage',
  });
  return CarsImage;
};