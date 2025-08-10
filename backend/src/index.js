import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { PrismaClient } from "../generated/prisma/index.js";

dotenv.config();
const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// Obtener todas las tareas
app.get("/toDoList", async (req, res) => {
  const todos = await prisma.todo.findMany();
  res.json(todos);
});

// Crear tarea
app.post("/toDoList", async (req, res) => {
  const { title } = req.body;
  const todo = await prisma.todo.create({ data: { title } });
  res.json(todo);
});

// Actualizar tarea
app.put("/toDoList/:id", async (req, res) => {
  const { id } = req.params;
  const { title, completed } = req.body;
  const todo = await prisma.todo.update({
    where: { id: Number(id) },
    data: { title, completed },
  });
  res.json(todo);
});

// Eliminar tarea
app.delete("/toDoList/:id", async (req, res) => {
  const { id } = req.params;
  await prisma.todo.delete({ where: { id: Number(id) } });
  res.json({ message: "Tarea eliminada" });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Backend corriendo en puerto ${PORT}`));
