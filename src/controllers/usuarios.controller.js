import pool from "../config/db.js";

const zonasPermitidas = ["vereda", "patio", "comunal", "escuela"];

function validarId(id) {
  return /^\d+$/.test(id) && Number(id) > 0;
}

function validarUsuario({ nombre, correo, edad, telefono, zona } = {}) {
  if (
    typeof nombre !== "string" || !nombre.trim()
    || typeof correo !== "string" || !correo.trim()
    || edad === undefined
    || typeof telefono !== "string" || !telefono.trim()
    || typeof zona !== "string" || !zona
  ) {
    return "Todos los campos son obligatorios.";
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {
    return "El correo no tiene un formato válido.";
  }

  const edadNumero = Number(edad);
  if (!Number.isInteger(edadNumero) || edadNumero < 18 || edadNumero > 90) {
    return "La edad debe ser un número entero entre 18 y 90.";
  }

  if (!zonasPermitidas.includes(zona)) {
    return `La zona debe ser una de estas opciones: ${zonasPermitidas.join(", ")}.`;
  }

  return null;
}

function manejarError(error, res) {
  if (error.code === "23505") {
    return res.status(409).json({ error: "Ya existe un usuario con ese correo." });
  }

  console.error(error);
  return res.status(500).json({ error: "Error interno del servidor." });
}

export async function crearUsuario(req, res) {
  const errorValidacion = validarUsuario(req.body);
  if (errorValidacion) return res.status(400).json({ error: errorValidacion });

  const { nombre, correo, edad, telefono, zona } = req.body;

  try {
    const resultado = await pool.query(
      `INSERT INTO usuarios (nombre, correo, edad, telefono, zona)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [nombre.trim(), correo.trim().toLowerCase(), Number(edad), telefono.trim(), zona],
    );

    return res.status(201).json(resultado.rows[0]);
  } catch (error) {
    return manejarError(error, res);
  }
}

export async function obtenerUsuarios(_req, res) {
  try {
    const resultado = await pool.query("SELECT * FROM usuarios ORDER BY id");
    return res.status(200).json(resultado.rows);
  } catch (error) {
    return manejarError(error, res);
  }
}

export async function obtenerUsuarioPorId(req, res) {
  if (!validarId(req.params.id)) {
    return res.status(400).json({ error: "El ID debe ser un número entero positivo." });
  }

  try {
    const resultado = await pool.query("SELECT * FROM usuarios WHERE id = $1", [req.params.id]);
    if (resultado.rowCount === 0) {
      return res.status(404).json({ error: "Usuario no encontrado." });
    }

    return res.status(200).json(resultado.rows[0]);
  } catch (error) {
    return manejarError(error, res);
  }
}

export async function actualizarUsuario(req, res) {
  if (!validarId(req.params.id)) {
    return res.status(400).json({ error: "El ID debe ser un número entero positivo." });
  }

  const errorValidacion = validarUsuario(req.body);
  if (errorValidacion) return res.status(400).json({ error: errorValidacion });

  const { nombre, correo, edad, telefono, zona } = req.body;

  try {
    const resultado = await pool.query(
      `UPDATE usuarios
       SET nombre = $1, correo = $2, edad = $3, telefono = $4, zona = $5,
           actualizado_en = CURRENT_TIMESTAMP
       WHERE id = $6
       RETURNING *`,
      [nombre.trim(), correo.trim().toLowerCase(), Number(edad), telefono.trim(), zona, req.params.id],
    );

    if (resultado.rowCount === 0) {
      return res.status(404).json({ error: "Usuario no encontrado." });
    }

    return res.status(200).json(resultado.rows[0]);
  } catch (error) {
    return manejarError(error, res);
  }
}

export async function eliminarUsuario(req, res) {
  if (!validarId(req.params.id)) {
    return res.status(400).json({ error: "El ID debe ser un número entero positivo." });
  }

  try {
    const resultado = await pool.query("DELETE FROM usuarios WHERE id = $1 RETURNING id", [req.params.id]);
    if (resultado.rowCount === 0) {
      return res.status(404).json({ error: "Usuario no encontrado." });
    }

    return res.status(200).json({ mensaje: "Usuario eliminado correctamente." });
  } catch (error) {
    return manejarError(error, res);
  }
}
