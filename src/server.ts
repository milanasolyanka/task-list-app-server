import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";

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

app.get("/tasks", (req: Request, res: Response) => {
  res.json(tasks);
});

app.post("/tasks", (req: Request, res: Response) => {
  const newTask: ITask = req.body;
  tasks.push(newTask);
  res.json(newTask);
});

app.put("/tasks/:id", (req: Request, res: Response) => {
  const taskId = parseInt(req.params.id);
  const updatedTask: ITask = req.body;

  tasks = tasks.map((task) =>
    task.id === taskId ? { ...task, ...updatedTask } : task
  );

  res.json(updatedTask);
});

app.delete("/tasks/:taskId", (req, res) => {
  const taskId = parseInt(req.params.taskId, 10);
  console.log("Trying to delete task with ID:", taskId);

  const taskIndex = tasks.findIndex((task) => task.id === taskId);

  if (taskIndex !== -1) {
    tasks.splice(taskIndex, 1);
    console.log("Task deleted. Updated tasks:", tasks);
    res.json({ message: "Task deleted successfully" });
  } else {
    console.log("Task not found for deletion. Current tasks:", tasks);
    res.status(404).json({ message: "Task not found" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
