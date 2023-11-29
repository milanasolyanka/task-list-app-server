//import { Task } from "./sequelize-models";
const { Task } = require("./sequelize-models.ts");
import { ITask } from "./api";

export const fetchTasks = async () => {
  try {
    const tasks = await Task.findAll();
    return tasks;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error;
  }
};

export const createTask = async (newTaskData: ITask) => {
  try {
    const createdTask = await Task.create(newTaskData);
    return createdTask;
  } catch (error) {
    console.error("Error creating task:", error);
    throw error;
  }
};

export const updateTaskById = async (
  taskId: number,
  updatedTaskData: ITask
) => {
  try {
    const [updatedRows] = await Task.update(updatedTaskData, {
      where: { id: taskId },
    });

    if (updatedRows > 0) {
      const updatedTask = await Task.findByPk(taskId);
      return updatedTask;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error updating task:", error);
    throw error;
  }
};

export const deleteTaskById = async (taskId: number) => {
  try {
    const deletedRows = await Task.destroy({ where: { id: taskId } });

    return deletedRows > 0;
  } catch (error) {
    console.error("Error deleting task:", error);
    throw error;
  }
};
