🌐 Live App: https://camsandvl.github.io/Frontend-Web/

# Series Tracker — Backend API

> API REST para gestionar un tracker personal de series. Desarrollado con Node.js, Express y PostgreSQL.

🔗 **Repositorio Frontend**: [https://github.com/camsandvl/Frontend-Web](https://github.com/camsandvl/Frontend-Web)
🌐 **API en producción**: [https://backend-web-7aqu.onrender.com/](https://backend-web-7aqu.onrender.com/)
📖 **Swagger UI**: [https://backend-web-7aqu.onrender.com/docs/](https://backend-web-7aqu.onrender.com/docs/)

---

## 📸 Screenshot

![Swagger UI](./screenshots/SwaggerUI.png)

---

## 🛠️ Tecnologías utilizadas

* **Runtime**: Node.js
* **Framework**: Express
* **Base de datos**: PostgreSQL (Render)
* **Subida de imágenes**: Multer (multipart/form-data, ~1MB máx)
* **Documentación API**: Swagger UI + OpenAPI 3.0 (YAML)

---

## ⚙️ Ejecución local

### Requisitos

* Node.js 18 o superior
* PostgreSQL instalado y corriendo

---

### Pasos

```bash
# 1. Clonar el repositorio
git clone https://github.com/camsandvl/Backend-Web.git
cd Backend-Web

# 2. Instalar dependencias
npm install

# 3. Crear la base de datos
createdb series_db

# 4. Ejecutar el esquema
psql series_db < src/db/schema.sql

# 5. Configurar variables de entorno
cp .env.example .env
# Editar DATABASE_URL con tu conexión local

# 6. Ejecutar servidor
npm run dev
```

Servidor → [http://localhost:3000](http://localhost:3000)
Swagger → [http://localhost:3000/docs](http://localhost:3000/docs)

---

## 🔐 Variables de entorno

| Variable     | Descripción                             | Ejemplo                                                                        |
| ------------ | --------------------------------------- | ------------------------------------------------------------------------------ |
| PORT         | Puerto del servidor                     | 3000                                                                           |
| DATABASE_URL | Conexión a PostgreSQL                   | postgresql://user:pass@localhost:5432/series_db                                |
| BASE_URL     | URL pública del backend (para imágenes) | [https://backend-web-7aqu.onrender.com](https://backend-web-7aqu.onrender.com) |

---

## 📡 Endpoints principales

| Método | Endpoint           | Descripción                                             |
| ------ | ------------------ | ------------------------------------------------------- |
| GET    | /series            | Listar series (con paginación, búsqueda y ordenamiento) |
| GET    | /series/:id        | Obtener una serie por ID                                |
| POST   | /series            | Crear una serie                                         |
| PUT    | /series/:id        | Actualizar una serie                                    |
| DELETE | /series/:id        | Eliminar una serie                                      |
| GET    | /series/:id/rating | Obtener rating promedio                                 |
| POST   | /series/:id/rating | Enviar rating                                           |
| GET    | /docs              | Swagger UI                                              |
| GET    | /docs/spec         | OpenAPI JSON                                            |

### Parámetros disponibles

* `?page=`
* `?limit=`
* `?q=` (búsqueda por nombre)
* `?sort=`
* `?order=asc|desc`

---

## 🌐 Despliegue

El backend está desplegado usando **Render (plan gratuito)**.

Características:

* API pública accesible vía HTTPS
* Base de datos PostgreSQL en la nube
* Variables de entorno configuradas en Render

⚠️ Nota importante:
El servicio puede tardar unos segundos en responder la primera vez, ya que Render pausa el servidor por inactividad (free tier).

---

## 🖼️ Manejo de imágenes

Las imágenes se manejan mediante:

* Subida con `multipart/form-data` usando Multer
* Almacenamiento en el servidor en la carpeta `/uploads`
* En la base de datos se guarda únicamente la ruta (`image_url`)

⚠️ En producción (Render), el almacenamiento es temporal, por lo que las imágenes pueden perderse si el servicio se reinicia. Sin embargo, esta implementación cumple con los requisitos del proyecto.

---

## 🔒 ¿Qué es CORS?

CORS (Cross-Origin Resource Sharing) es una política de seguridad del navegador que bloquea peticiones entre diferentes orígenes (dominio o puerto).

Como el frontend y backend corren en orígenes distintos, se configuró el servidor para permitir solicitudes externas mediante:

* Access-Control-Allow-Origin: *
* Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS
* Access-Control-Allow-Headers: Content-Type

Esto permite que el frontend consuma la API correctamente.

---

## ✅ Funcionalidades implementadas

* ✔ CRUD completo de series
* ✔ Códigos HTTP correctos (201, 204, 404, 400, etc.)
* ✔ Validación server-side con errores en JSON
* ✔ Paginación
* ✔ Búsqueda
* ✔ Ordenamiento
* ✔ Documentación con OpenAPI
* ✔ Swagger UI funcionando
* ✔ Subida de imágenes
* ✔ Sistema de rating con tabla independiente

---

## 🧠 Reflexión

Durante este proyecto aprendí a construir una aplicación full stack con una separación clara entre cliente y servidor. Comprendí cómo una API REST funciona como un contrato entre ambas partes, utilizando métodos HTTP adecuados y respuestas en formato JSON.

Uno de los retos principales fue la configuración de la base de datos en producción, especialmente el manejo de conexiones seguras (SSL) en Render. También fue interesante trabajar con la subida de imágenes usando Multer y entender las limitaciones del almacenamiento en entornos cloud.

Si mejorara este proyecto, implementaría almacenamiento persistente de imágenes usando servicios como AWS S3 o Cloudinary, y añadiría autenticación de usuarios.

Definitivamente usaría este stack nuevamente, ya que ofrece una base sólida para aplicaciones web reales.

