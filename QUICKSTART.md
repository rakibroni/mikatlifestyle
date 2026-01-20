# Quick Start Guide

## Prerequisites
- Node.js 20+ installed
- Docker Desktop (optional but recommended)
- PostgreSQL 15+ (if not using Docker)

## Option 1: Using Docker (Recommended)

1. **Start all services:**
   ```bash
   docker-compose up -d
   ```

2. **Access the applications:**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:3001
   - API Docs: http://localhost:3001/api/docs

3. **Stop services:**
   ```bash
   docker-compose down
   ```

## Option 2: Manual Setup

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment:**
   ```bash
   cp env.example .env
   # Edit .env with your database credentials
   ```

4. **Start PostgreSQL** (if not using Docker)

5. **Run migrations** (tables are auto-created in development mode)

6. **Start the server:**
   ```bash
   npm run start:dev
   ```

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment:**
   ```bash
   cp env.example .env.local
   # Edit .env.local if needed
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```

## First Steps

1. **Register a user:**
   - Go to http://localhost:3000
   - Register a new account via the API or frontend

2. **Create categories and products:**
   - Use the Swagger UI at http://localhost:3001/api/docs
   - Or use the admin panel (if implemented)

3. **Start shopping!**

## Troubleshooting

### Database Connection Issues
- Ensure PostgreSQL is running
- Check database credentials in `.env`
- Verify database exists: `createdb mikatlifestyle`

### Port Already in Use
- Change ports in `docker-compose.yml` or `.env` files
- Kill processes using ports 3000, 3001, or 5432

### CORS Issues
- Ensure `FRONTEND_URL` in backend `.env` matches your frontend URL
