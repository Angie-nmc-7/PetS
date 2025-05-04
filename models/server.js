import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import users_router from "../routes/users_route.js";
import reservas_router from "../routes/reservas_route.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3000;

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(express.json());
    this.app.use(cors());

    // Sirve archivos estáticos como HTML/CSS desde 'public'
    this.app.use(express.static(path.join(__dirname, "../public")));
  }

  routes() {
    // Rutas de API
    this.app.use("/api/usuarios", users_router);
    this.app.use("/api/reservas", reservas_router);

    // Rutas para las páginas estáticas
    this.app.get("/", (req, res) => res.sendFile(path.join(__dirname, "../public/index.html")));
    this.app.get("/about", (req, res) => res.sendFile(path.join(__dirname, "../public/about.html")));
    this.app.get("/servicios", (req, res) => res.sendFile(path.join(__dirname, "../public/servicios.html")));
  }

  start() {
    this.app.listen(this.port, () => {
      console.log(`✅ Servidor corriendo en http://localhost:${this.port}`);
    });
  }
}

export default Server;
