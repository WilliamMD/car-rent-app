'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CarsComment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      CarsComment.belongsTo(models.User, {foreignKey: 'UserId'});
      CarsComment.belongsTo(models.Car, {foreignKey: 'CarId'});
    }
  };
  CarsComment.init({
    comments: DataTypes.STRING,
    created_on: DataTypes.DATE,
    rating: DataTypes.INTEGER,
    CarId: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'CarsComment',
  });
  return CarsComment;
};