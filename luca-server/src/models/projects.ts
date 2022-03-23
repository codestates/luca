import {
  DataTypes, 
  Model, 
  Association
} from "sequelize";
import { sequelize } from "./index";
import { Cards } from "./cards";
import { Users_Projects } from "./users_projects";

interface ProjectsAttributes {
  id: number;
  title : string;
  desc : string;
  isTeam : boolean;
  admin : number;
}

export class Projects extends Model<ProjectsAttributes>{
  public readonly id! : number;
  public title! : string;
  public desc! : string | null;
  public isTeam! : boolean;
  public admin! : number;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public static associations: {
    projectHasManyCards: Association<Projects, Cards>;
    projectHasManyUsers_Projects: Association<Projects, Users_Projects>;
  };
}

Projects.init(
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
      modelName : "projects",
      tableName : "projects",
      sequelize,
      freezeTableName : true,
      timestamps : true,
      updatedAt : "updatedAt"
  }
)

Projects.hasMany(Users_Projects, {
  sourceKey : "id",
  foreignKey : "projectId",
  as : "projectHasManyUsers_Projects"
});

Projects.hasMany(Cards, {
  sourceKey : "id",
  foreignKey : "projectId",
  as : "projectHasManyCards"
});

