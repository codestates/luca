"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    static associate(models) {
      this.hasOne(models.projects, { foreignKey: "admin", sourceKey: "id" });
      this.hasMany(models.users_projects, {
        foreignKey: "userId",
        sourceKey: "id",
      });
      this.hasMany(models.cards, { foreignKey: "userId", sourceKey: "id" });
    }
  }
  users.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      isGuest: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      isSocial: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "users",
    }
  );
  return users;
};
