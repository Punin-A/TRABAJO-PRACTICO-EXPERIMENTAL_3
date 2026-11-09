# API REST - Raíz Urbana

API REST desarrollada para administrar las postulaciones de usuarios del programa comunitario Raíz Urbana. El proyecto continúa el formulario creado en la práctica anterior y permite almacenar sus datos en PostgreSQL.

## Tecnologías utilizadas

- Node.js
- Express
- PostgreSQL
- `pg` para la conexión entre Node.js y PostgreSQL
- `dotenv` para las variables de entorno
- Postman para probar los endpoints

## Funcionalidades implementadas

- Registro de usuarios.
- Consulta de todos los usuarios.
- Consulta de un usuario por ID.
- Actualización de usuarios.
- Eliminación de usuarios.
- Validación de campos, correo, edad y zona de plantación.
- Control de correos duplicados.
- Respuestas HTTP para operaciones exitosas y errores.
- Colección de Postman y registros iniciales para realizar pruebas.

## Sesión 1 - Node.js, Express y API REST

El proyecto está organizado en rutas, controladores y configuración de base de datos:

```text
src/
├── config/db.js
├── controllers/usuarios.controller.js
├── routes/usuarios.routes.js
├── app.js
└── server.js
```

Instalar las dependencias:

```bash
npm install
```

## Sesión 2 - PostgreSQL y CRUD

1. Ejecutar `sql/01-crear-base-datos.sql` en PostgreSQL.
2. Conectarse a la base `raiz_urbana_db` y ejecutar `sql/02-tabla-y-datos.sql`.
3. Copiar `.env.example` como `.env` y colocar la contraseña de PostgreSQL.
4. Iniciar la API:

```bash
npm run dev
```

La API se ejecuta en `http://localhost:3000` y ofrece estos endpoints:

| Método | Ruta | Operación |
|---|---|---|
| POST | `/usuarios` | Registrar |
| GET | `/usuarios` | Consultar todos |
| GET | `/usuarios/:id` | Consultar por ID |
| PUT | `/usuarios/:id` | Actualizar |
| DELETE | `/usuarios/:id` | Eliminar |

Ejemplo de datos JSON para registrar o actualizar:

```json
{
  "nombre": "María López",
  "correo": "maria@example.com",
  "edad": 30,
  "telefono": "096 234 5678",
  "zona": "escuela"
}
```

Las zonas válidas son `vereda`, `patio`, `comunal` y `escuela`.

## Sesión 3 - Pruebas con Postman

1. Importar `postman/Raiz-Urbana-API.postman_collection.json` en Postman.
2. Ejecutar primero **Registrar usuario** o usar los tres registros incluidos en el script SQL.
3. Probar las consultas, la actualización y la eliminación.

Respuestas HTTP implementadas:

| Código | Significado |
|---|---|
| 200 | Consulta, actualización o eliminación correcta |
| 201 | Usuario registrado correctamente |
| 400 | Datos o JSON inválidos |
| 404 | Ruta o usuario no encontrado |
| 409 | Correo ya registrado |
| 500 | Error interno o de base de datos |
