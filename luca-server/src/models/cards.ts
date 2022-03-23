import {
  DataTypes, 
  Model
} from "sequelize";
import { sequelize } from "./index";

interface CardsAttributes {
  id: number;
  projectId : number;
  userId : number;
  content : string;
  parent : number;
  color : string;
  storage : string;
}

export class Cards extends Model<CardsAttributes>{
  public readonly id! : number;
  public projectId! : number;
  public userId! : number;
  public content! : string;
  public parent! : number;
  public color! : string;
  public storage! : string;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}
//----------------------------
Cards.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    projectId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    parent: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    color: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    storage: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
  {
      modelName : "cards",
      tableName : "cards",
      sequelize,
      freezeTableName : true,
      timestamps : true,
      updatedAt : "updatedAt"
  }
)



