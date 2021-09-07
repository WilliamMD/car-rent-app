"use strict";
const { Model } = require("sequelize");
const { encrypter } = require("../helpers/bcrypt");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.CarsComment);
      User.hasMany(models.Car);
      User.hasMany(models.Cart);
      User.hasMany(models.Order, { foreignKey: "order_name" });
    }
  }
  User.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      salt: DataTypes.STRING,
      birthdate: DataTypes.DATE,
      gender: DataTypes.STRING,
      avatar: DataTypes.STRING,
      type: DataTypes.STRING,
    },
    {
      hooks: {
        beforeCreate(user, option) {
          user.password = encrypter(user.password);
          user.salt = encrypter("rahasia");
          user.avatar = "defaultAvatar.png";
          user.type = "user";
        },
      },
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
