CREATE TABLE IF NOT EXISTS usuarios (
  id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  correo VARCHAR(150) NOT NULL UNIQUE,
  edad INTEGER NOT NULL CHECK (edad BETWEEN 18 AND 90),
  telefono VARCHAR(20) NOT NULL,
  zona VARCHAR(20) NOT NULL CHECK (zona IN ('vereda', 'patio', 'comunal', 'escuela')),
  creado_en TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  actualizado_en TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO usuarios (nombre, correo, edad, telefono, zona)
VALUES
  ('Andrea Morales', 'andrea@example.com', 28, '098 765 4321', 'patio'),
  ('Luis Mendoza', 'luis@example.com', 35, '099 123 4567', 'vereda'),
  ('Camila Torres', 'camila@example.com', 22, '097 555 0182', 'comunal')
ON CONFLICT (correo) DO NOTHING;
