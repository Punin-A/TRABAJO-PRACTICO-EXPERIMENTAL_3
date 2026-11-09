import "dotenv/config";
import app from "./app.js";
import pool from "./config/db.js";

const port = Number(process.env.PORT || 3000);

try {
  await pool.query("SELECT 1");
  app.listen(port, () => {
    console.log(`Servidor disponible en http://localhost:${port}`);
  });
} catch (error) {
  console.error("No se pudo conectar con PostgreSQL:", error.message);
  process.exit(1);
}
