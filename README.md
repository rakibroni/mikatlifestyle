# Mika Lifestyle

E-commerce full-stack application with a Next.js frontend, NestJS backend, and PostgreSQL database.

## Tech Stack

- **Frontend:** Next.js 14, React, Tailwind CSS, Zustand, React Hook Form, Axios
- **Backend:** NestJS, TypeORM, PostgreSQL, JWT authentication, Passport
- **Database:** PostgreSQL 15

## Prerequisites

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) (recommended)
- Or: Node.js 18+, npm, and PostgreSQL 15 (for local development)

## Quick Start (Docker)

1. Ensure **Docker Desktop** is running.

2. From the project root:

   ```bash
   docker compose up --build
   ```

3. Open in your browser:
   - **Frontend:** http://localhost:3000
   - **Backend API:** http://localhost:3001

4. Stop everything: `Ctrl+C`, then:

   ```bash
   docker compose down
   ```

## Running Without Docker

### 1. Database

Install and start PostgreSQL 15, then create a database:

```bash
createdb mikatlifestyle
```

Default connection: `postgres` / `postgres` on `localhost:5432`.

### 2. Backend

```bash
cd backend
cp env.example .env
# Edit .env if your DB credentials differ
npm install
npm run start:dev
```

API runs at http://localhost:3001.

### 3. Frontend

In a new terminal:

```bash
cd frontend
cp env.example .env.local
# Ensure NEXT_PUBLIC_API_URL=http://localhost:3001 in .env.local
npm install
npm run dev
```

App runs at http://localhost:3000.

## Environment Variables

### Backend (`backend/.env`)

| Variable       | Description           | Default                          |
|----------------|-----------------------|----------------------------------|
| DB_HOST        | PostgreSQL host       | localhost                        |
| DB_PORT        | PostgreSQL port       | 5432                             |
| DB_USERNAME    | DB user               | postgres                         |
| DB_PASSWORD    | DB password           | postgres                         |
| DB_NAME        | Database name         | mikatlifestyle                   |
| JWT_SECRET     | Secret for JWT tokens | (set a strong value in production) |
| JWT_EXPIRES_IN | Token expiry          | 7d                               |
| PORT           | API port              | 3001                             |
| FRONTEND_URL   | Frontend origin       | http://localhost:3000            |

### Frontend (`frontend/.env.local`)

| Variable             | Description   | Default            |
|----------------------|---------------|--------------------|
| NEXT_PUBLIC_API_URL  | Backend API   | http://localhost:3001 |

## Project Structure

```
mikatlifestyle/
├── backend/          # NestJS API (auth, users, products, cart, orders)
├── frontend/          # Next.js app (pages, components, store)
├── docker-compose.yml # Postgres + backend + frontend
└── README.md
```

## Scripts

### Backend (`backend/`)

- `npm run start:dev` — Run API with watch mode
- `npm run build` — Build for production
- `npm run start:prod` — Run production build

### Frontend (`frontend/`)

- `npm run dev` — Run Next.js dev server
- `npm run build` — Build for production
- `npm run start` — Run production server

## License

Private / Unlicensed
