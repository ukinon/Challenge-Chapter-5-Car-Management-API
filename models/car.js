"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Car extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Car.hasMany(models.ActivityLog, {
        foreignKey: {
          name: "dataId",
        },
      });
    }
  }
  Car.init(
    {
      name: DataTypes.STRING,
      price: DataTypes.INTEGER,
      type: DataTypes.STRING,
      category: DataTypes.ENUM(["small", "medium", "large"]),
      available: DataTypes.BOOLEAN,
      imageUrl: DataTypes.STRING,
    },
    {
      sequelize,
      paranoid: true,
      modelName: "Car",
    }
  );
  return Car;
};
