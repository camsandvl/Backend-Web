# Series Tracker — Backend API

> REST API for a personal series tracker. Built with Node.js, Express, and PostgreSQL.

🔗 **Frontend repo**: _add link here_
🌐 **Live API**: _add deployed URL here_
📖 **Swagger UI**: _deployed-url/docs_

---

## Screenshot



---

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express
- **Database**: PostgreSQL (via `pg`)
- **Image upload**: Multer (multipart/form-data, max 1MB)
- **API Docs**: swagger-ui-express + OpenAPI 3.0 YAML

---

## Running locally

### Prerequisites
- Node.js 18+
- PostgreSQL running locally

### Steps

```bash
# 1. Clone the repo
git clone https://github.com/your-user/Backend-Web.git
cd Backend-Web

# 2. Install dependencies
npm install

# 3. Create the database
createdb series_db

# 4. Run the schema
psql series_db < src/db/schema.sql

# 5. Set up environment variables
cp .env.example .env
# Edit .env — set DATABASE_URL to your local postgres connection string

# 6. Start the dev server
npm run dev
```

Server → `http://localhost:3000`
Swagger UI → `http://localhost:3000/docs`

### Environment variables

| Variable       | Description                   | Example                                           |
|----------------|-------------------------------|---------------------------------------------------|
| `PORT`         | Port the server listens on    | `3000`                                            |
| `NODE_ENV`     | Enables production behavior (DB SSL on `production`) | `production` |
| `DATABASE_URL` | PostgreSQL connection string  | `postgresql://postgres:pass@localhost:5432/series_db` |
| `BASE_URL`     | Public backend base URL used to build image URLs | `https://your-backend.onrender.com` |

---

## API Endpoints

| Method | Endpoint             | Description                              |
|--------|----------------------|------------------------------------------|
| GET    | `/series`            | List all series (pagination, search, sort) |
| GET    | `/series/:id`        | Get one series by ID                     |
| POST   | `/series`            | Create a series (multipart/form-data)    |
| PUT    | `/series/:id`        | Update a series                          |
| DELETE | `/series/:id`        | Delete a series                          |
| GET    | `/series/:id/rating` | Get average rating for a series          |
| POST   | `/series/:id/rating` | Submit a rating (1–10)                   |
| GET    | `/docs`              | Swagger UI                               |
| GET    | `/docs/spec`         | Raw OpenAPI JSON                         |

Query params for `GET /series`: `?page=` `?limit=` `?q=` `?sort=` `?order=`

---

## What is CORS?

CORS (Cross-Origin Resource Sharing) is a browser security policy that blocks JavaScript
from making fetch() requests to a different origin (domain or port) than the page itself.
Since the client runs on a different port, we configured Express to send
`Access-Control-Allow-Origin: *` so any client can call the API freely.

---

## Implemented challenges

- [x] Correct HTTP status codes (201 on create, 204 on delete, 404 on missing, 400 on bad input)
- [x] Server-side validation with descriptive JSON error responses
- [x] Pagination (`?page=`, `?limit=`)
- [x] Search by title (`?q=`)
- [x] Sort (`?sort=`, `?order=`)
- [x] OpenAPI 3.0 spec (YAML, precise and complete)
- [x] Swagger UI served from the backend at `/docs`
- [x] Image upload via multipart/form-data (max 1MB)
- [x] Rating system — separate `ratings` table with own REST endpoints

---

## Reflection

_Write your reflection here — required, -20 pts if missing._
