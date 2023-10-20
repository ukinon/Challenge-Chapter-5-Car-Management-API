"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasOne(models.Auth, {
        foreignKey: {
          name: "userId",
          allowNull: false,
        },
      });

      User.hasMany(models.Car, {
        foreignKey: {
          name: "createdBy",
          allowNull: true,
        },
      });
      User.hasMany(models.Car, {
        foreignKey: {
          name: "updatedBy",
          allowNull: true,
        },
      });
      User.hasMany(models.Car, {
        foreignKey: {
          name: "deletedBy",
          allowNull: true,
        },
      });
    }
  }
  User.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      age: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      type: {
        type: DataTypes.ENUM(["superadmin", "admin", "member"]),
        defaultValue: "member",
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
