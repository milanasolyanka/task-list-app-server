import sequelize from "./sequelize-config";
//import { Model, DataTypes } from "sequelize";
//const { sequelize } = require("./sequelize-config.ts");
const { Model, DataTypes } = require("sequelize");

// CREATE TABLE IF NOT EXISTS task (
//   id BIGINT PRIMARY KEY NOT NULL,
//   taskText VARCHAR(255) NOT NULL,
//   isDone BOOLEAN DEFAULT false
// );

/*class Task extends Model 
{
  declare id: number;
  declare taskText: string;
  declare isDone: boolean;
}

Task.init(
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      allowNull: false,
    },
    taskText: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isDone: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: "Task",
    tableName: "tasks",
    timestamps: false,
  }
); */

export const Task = sequelize.define(
  "Task",
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      allowNull: false,
    },
    taskText: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isDone: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    
    modelName: "Task",
    tableName: "tasks",
    timestamps: false,
  }
);

export default Task;

// module.exports = {
//   Task,
//   sequelize,
// };
