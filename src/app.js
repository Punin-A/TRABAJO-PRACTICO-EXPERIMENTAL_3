import express from "express";
import usuariosRoutes from "./routes/usuarios.routes.js";

const app = express();

app.use(express.json());

app.get("/", (_req, res) => {
  res.status(200).json({ mensaje: "API REST de Raíz Urbana" });
});

app.use("/usuarios", usuariosRoutes);

app.use((_req, res) => {
  res.status(404).json({ error: "Ruta no encontrada." });
});

app.use((error, _req, res, _next) => {
  if (error instanceof SyntaxError && error.status === 400 && "body" in error) {
    return res.status(400).json({ error: "El cuerpo de la solicitud contiene JSON inválido." });
  }

  console.error(error);
  return res.status(500).json({ error: "Error interno del servidor." });
});

export default app;
