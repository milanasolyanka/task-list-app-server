import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { fetchTasks, createTask, updateTaskById, deleteTaskById } from "./db";

export type ITask = {
  id: number;
  taskText: string;
  isDone: boolean;
};

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

let tasks: ITask[] = [];

app.get("/tasks", async (req: Request, res: Response) => {
  try {
    const tasks = await fetchTasks();
    res.json(tasks);
  } catch (error) {
    console.error("Error fetching tasks from database:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.post("/tasks", async (req: Request, res: Response) => {
  console.log(req.body);
  try {
    
    const newTaskData: ITask = req.body;
    const createdTask = await createTask(newTaskData);
    res.json(createdTask);
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.put("/tasks/:id", async (req: Request, res: Response) => {
  const taskId = parseInt(req.params.id);
  const updatedTaskData: ITask = req.body;

  try {
    const updatedTask = await updateTaskById(taskId, updatedTaskData);

    if (updatedTask) {
      res.json(updatedTask);
    } else {
      res.status(404).json({ message: "Task not found" });
    }
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.delete("/tasks/:id", async (req, res) => {
  const taskId = parseInt(req.params.id);

  try {
    const isDeleted = await deleteTaskById(taskId);

    if (isDeleted) {
      res.json({ message: "Task deleted successfully" });
    } else {
      res.status(404).json({ message: "Task not found" });
    }
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
