"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ActivityLog extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ActivityLog.belongsTo(models.Car, {
        foreignKey: {
          name: "dataId",
        },
      });

      ActivityLog.belongsTo(models.User, {
        foreignKey: {
          name: "userId",
        },
      });
    }
  }
  ActivityLog.init(
    {
      username: DataTypes.STRING,
      userId: DataTypes.INTEGER,
      dataId: DataTypes.INTEGER,
      action: DataTypes.ENUM * ["create", "update", "delete"],
      timestamp: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "ActivityLog",
    }
  );
  return ActivityLog;
};
