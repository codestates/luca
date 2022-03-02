"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class projects extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.users, { foreignKey: "admin", targetKey: "id" });
      this.hasMany(models.users_projects, {
        foreignKey: "projectId",
        sourceKey: "id",
      });
      this.hasMany(models.cards, { foreignKey: "projectId", sourceKey: "id" });
    }
  }
  projects.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      desc: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      isTeam: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      admin: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "projects",
    }
  );
  return projects;
};
