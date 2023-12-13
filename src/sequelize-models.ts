import sequelize from "./sequelize-config";
const { Model, DataTypes } = require("sequelize");

// CREATE TABLE IF NOT EXISTS task (
//   id BIGINT PRIMARY KEY NOT NULL,
//   taskText VARCHAR(255) NOT NULL,
//   isDone BOOLEAN DEFAULT false
// );
// CREATE TABLE IF NOT EXISTS users (
//   email VARCHAR(100) PRIMARY KEY NOT NULL,
//   password VARCHAR(100) NOT NULL
// );

export const User = sequelize.define(
  "user",
  {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    modelName: "User",
    tableName: "users",
    timestamps: false,
  }
);

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
