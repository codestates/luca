import {
  DataTypes, 
  Model, 
  Association
} from "sequelize";
import { sequelize } from "./index";
import { Cards } from "./cards";		
import { Users_Projects } from "./users_projects"
import { Projects } from "./projects";

interface UsersAttributes {
  id: number;
  name : string;
  email : string;
  password : string;
  isGuest : boolean;
  isSocial: string | null;
}

export class Users extends Model<UsersAttributes>{
  public readonly id! : number;
  public name! : string;
  public email! : string;
  public password! : string;
  public isGuest! : boolean;
  public isSocial! : string | null;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public static associations: {
      userHasManyCards: Association<Users, Cards>;
      userHasManyUsers_Projects: Association<Users, Users_Projects>;
      userHasManyProjects: Association<Users, Projects>;
  };
}

Users.init(
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
      modelName : "users",
      tableName : "users",
      sequelize,
      freezeTableName : true,
      timestamps : true,
      updatedAt : "updatedAt"
  }
)

Users.hasMany(Projects, {
  sourceKey : "id",
  foreignKey : "admin",
  as : "userHasManyProjects"
});

Users.hasMany(Users_Projects, {
  sourceKey : "id",
  foreignKey : "userId",
  as : "userHasManyUsers_Projects"
});

Users.hasMany(Cards, {
  sourceKey : "id",
  foreignKey : "userId",
  as : "userHasManyCards"
});