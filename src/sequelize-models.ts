import { Model, DataTypes } from "sequelize";
import sequelize from "./sequelize-config";

class Task extends Model {
  public id!: number;
  public taskText!: string;
  public isDone!: boolean;
}

Task.init(
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      allowNull: false
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
);

export default Task;
