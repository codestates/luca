"use strict";
const {
  Model
} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class users_projects extends Model {
    static associate(models) {
      this.belongsTo(models.users, { foreignKey: "userId", targetKey: "id" });
      this.belongsTo(models.projects, { foreignKey: "projectId", targetKey: "id" });
    }
  }
  users_projects.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    projectId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    isAccept: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: "users_projects",
    timestamps: false,
  });
  return users_projects;
};