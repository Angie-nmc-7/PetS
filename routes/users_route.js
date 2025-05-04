import { Router } from "express";
import {
  getUsuariosFS,
  createUsuarioFS,
  updateUsuarioFS,
  deleteUsuarioFS,
} from "../controllers/usuarios_controller.js";

const usersRouter = Router();

usersRouter.get("/", getUsuariosFS); // Obtener usuarios
usersRouter.post("/create", createUsuarioFS); // Crear usuario
usersRouter.put("/update/:id", updateUsuarioFS); // Actualizar usuario
usersRouter.delete("/delete/:id", deleteUsuarioFS); // Eliminar usuario

export default usersRouter;
