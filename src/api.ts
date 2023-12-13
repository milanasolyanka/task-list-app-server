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

require("dotenv").config();
import { User } from "./sequelize-models";
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const salt = "$2b$10$3HVhKA2xxrCTEm4BKZ5oM.";

app.post("/login", (request, response) => {
  console.log(request.body);
  User.findOne({ where: { email: request.body.email } })
    .then((data: any) => {
      if (data === null) {
        response.status(404).send("Пользователь не найден");
      } else {
        const isRight = bcrypt.compareSync(
          request.body.password,
          data.password
        );
        if (isRight) {
          const token = jwt.sign(
            { email: request.body.email },
            process.env.JWT_KEY
          );
          response.json({ token, email: request.body.email });
        } else {
          response.status(401).send("Неверный пароль");
        }
      }
    })
    .catch((error) => {
      console.error("Ошибка входа:", error);
      response.status(500).send("Ошибка сервера при входе");
    });
});

app.post("/registration", (request, response) => {
  User.findOne({ where: { email: request.body.email } })
    .then((data: any) => {
      if (data === null) {
        const hashedPassword = bcrypt.hashSync(request.body.password, salt);
        User.create({
          email: request.body.email,
          password: hashedPassword,
        }).then((user: any) => {
          const token = jwt.sign({ email: user.email }, process.env.JWT_KEY);
          response.json({ token, email: user.email });
        });
      } else {
        response.status(409).send("Пользователь уже существует");
      }
    })
    .catch((error) => {
      console.error("Ошибка регистрации:", error);
      response.status(500).send("Ошибка сервера при регистрации");
    });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
