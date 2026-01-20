# Mika Lifestyle - E-commerce Fashion Store

A full-stack e-commerce platform for fashion dresses for men and women, built with Next.js, NestJS, and PostgreSQL.

> **📖 For detailed deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md)**

## 🏗️ Architecture

- **Frontend**: Next.js 14 with TypeScript, Tailwind CSS, Zustand for state management
- **Backend**: NestJS with TypeScript, TypeORM, JWT authentication
- **Database**: PostgreSQL
- **CI/CD**: GitHub Actions

## 📁 Project Structure

```
mikatlifestyle/
├── frontend/          # Next.js frontend application
├── backend/           # NestJS backend API
├── docker-compose.yml # Docker compose for local development
└── .github/           # GitHub Actions workflows
```

## 🚀 Getting Started

### Prerequisites

- Node.js 20+
- Docker and Docker Compose (optional, for containerized setup)
- PostgreSQL 15+ (if not using Docker)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd mikatlifestyle
   ```

2. **Set up environment variables**

   Backend:
   ```bash
   cd backend
   cp .env.example .env
   # Edit .env with your configuration
   ```

   Frontend:
   ```bash
   cd frontend
   cp .env.example .env.local
   # Edit .env.local with your configuration
   ```

3. **Using Docker Compose (Recommended)**

   ```bash
   # Start all services
   docker-compose up -d

   # View logs
   docker-compose logs -f

   # Stop services
   docker-compose down
   ```

4. **Manual Setup**

   **Backend:**
   ```bash
   cd backend
   npm install
   npm run start:dev
   ```

   **Frontend:**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

   **Database:**
   - Make sure PostgreSQL is running
   - Create a database named `mikatlifestyle`
   - The backend will automatically create tables on first run (in development mode)

## 📚 API Documentation

Once the backend is running, visit:
- Swagger UI: http://localhost:3001/api/docs
- API Base URL: http://localhost:3001/api

## 🔐 Authentication

The API uses JWT authentication. To access protected routes:

1. Register a new user: `POST /api/auth/register`
2. Login: `POST /api/auth/login`
3. Use the returned `access_token` in the Authorization header: `Bearer <token>`

## 🛠️ Development

### Backend Commands

```bash
cd backend

# Development
npm run start:dev

# Build
npm run build

# Production
npm run start:prod

# Run tests
npm run test

# Run linter
npm run lint
```

### Frontend Commands

```bash
cd frontend

# Development
npm run dev

# Build
npm run build

# Production
npm start

# Type check
npm run type-check

# Run linter
npm run lint
```

## 🧪 Testing

### Backend Tests
```bash
cd backend
npm run test
npm run test:e2e
```

### Frontend Tests
```bash
cd frontend
npm run test
```

## 🐳 Docker

### Build Images
```bash
docker-compose build
```

### Run Services
```bash
docker-compose up
```

### Stop Services
```bash
docker-compose down
```

## 📦 Features

### Frontend
- ✅ Product listing and filtering
- ✅ Product detail pages
- ✅ Shopping cart
- ✅ User authentication
- ✅ Order management
- ✅ Responsive design
- ✅ Modern UI with Tailwind CSS

### Backend
- ✅ RESTful API
- ✅ JWT Authentication
- ✅ User management
- ✅ Product management
- ✅ Category management
- ✅ Order processing
- ✅ Stock management
- ✅ Swagger documentation

## 🔄 CI/CD

The project includes three GitHub Actions workflows:

### 1. CI Pipeline (`ci.yml`)
- Runs on all branches and pull requests
- Executes tests, linting, and type checking
- Builds Docker images for testing (no push)

### 2. Beta Pipeline (`beta.yml`)
- Triggers on pushes to `beta` branch
- Runs all tests and builds Docker images
- Pushes images to GitHub Container Registry
- Deploys to beta/staging environment
- Image tags: `beta`, `beta-<sha>`

### 3. Production Pipeline (`production.yml`)
- Triggers on pushes to `main` branch
- Runs comprehensive tests (strict mode)
- Security scanning with Trivy
- Builds and pushes production Docker images
- Requires manual confirmation for deployment
- Includes smoke tests and automatic rollback
- Image tags: `latest`, `prod-<sha>`

**Workflow files are located in `.github/workflows/`**

For detailed pipeline documentation, see [`.github/workflows/README.md`](.github/workflows/README.md)

## 🚀 Deployment

This project uses **Vercel** for frontend deployment and supports multiple backend deployment platforms.

### Quick Start Deployment

1. **Follow the [Deployment Guide](./DEPLOYMENT.md)** for step-by-step instructions
2. **Set up GitHub Secrets** (Vercel tokens, project IDs)
3. **Create Vercel Projects** for beta and production
4. **Push to `beta` branch** for beta deployment
5. **Push to `main` branch** for production deployment

### Developer Workflow

```
Feature Branch → PR to Beta → Merge → Auto-deploy to Beta
                                    ↓
                              PR to Main → Merge → Auto-deploy to Production
```

## 📝 Environment Variables

### Backend (.env)
```
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_NAME=mikatlifestyle
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=7d
NODE_ENV=development
PORT=3001
FRONTEND_URL=http://localhost:3000
```

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:3001
```

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Run tests and linters
4. Submit a pull request

## 📄 License

This project is private and proprietary.

## 🆘 Support

For issues and questions, please contact the development team.
