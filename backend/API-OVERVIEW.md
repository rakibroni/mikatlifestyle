# Mika Lifestyle – NestJS API Overview

Learning-oriented overview of the backend: global config, entities (models), endpoints, DTOs, and auth.

**Base URL:** `http://localhost:3001/api`  
**Swagger UI:** `http://localhost:3001/api/docs`

---

## 1. Global configuration

| Setting | Value |
|--------|--------|
| **Prefix** | All routes live under `/api` |
| **Validation** | `ValidationPipe` (whitelist, forbid non-whitelisted, transform) |
| **CORS** | Allowed origin from `FRONTEND_URL` (e.g. `http://localhost:3000`) |
| **Auth** | JWT in `Authorization: Bearer <token>` for protected routes |

---

## 2. Entities (database models)

TypeORM entities map to PostgreSQL tables.

### User (`users`)

| Column | Type | Notes |
|--------|------|--------|
| id | UUID | PK, auto-generated |
| email | string | Unique |
| password | string | Hashed (bcrypt) |
| firstName | string | |
| lastName | string | |
| role | enum | `user` \| `admin` |
| createdAt | Date | Auto |
| updatedAt | Date | Auto |

**Relations:** One-to-many → `Order`.

---

### Category (`categories`)

| Column | Type | Notes |
|--------|------|--------|
| id | UUID | PK |
| name | string | |
| slug | string | Unique (e.g. `men`, `women`) |
| description | string | Optional |
| createdAt | Date | Auto |
| updatedAt | Date | Auto |

**Relations:** One-to-many → `Product`.

---

### Product (`products`)

| Column | Type | Notes |
|--------|------|--------|
| id | UUID | PK |
| name | string | |
| description | text | |
| price | decimal(10,2) | |
| images | string[] | Array of URLs |
| categoryId | UUID | FK → Category |
| gender | enum | `men` \| `women` \| `unisex` |
| sizes | string[] | e.g. `["S","M","L"]` |
| colors | string[] | e.g. `["Black","White"]` |
| stock | number | Default 0 |
| featured | boolean | Default false |
| createdAt | Date | Auto |
| updatedAt | Date | Auto |

**Relations:** Many-to-one → `Category`.

---

### Order (`orders`)

| Column | Type | Notes |
|--------|------|--------|
| id | UUID | PK |
| userId | UUID | FK → User |
| total | decimal(10,2) | |
| status | enum | `pending` \| `processing` \| `shipped` \| `delivered` \| `cancelled` |
| shippingAddress | jsonb | `{ street, city, state, zipCode, country }` |
| createdAt | Date | Auto |
| updatedAt | Date | Auto |

**Relations:** Many-to-one → `User`, One-to-many → `OrderItem`.

---

### OrderItem (`order_items`)

| Column | Type | Notes |
|--------|------|--------|
| id | UUID | PK |
| orderId | UUID | FK → Order |
| productId | UUID | FK → Product |
| quantity | number | |
| price | decimal(10,2) | Snapshot at order time |
| size | string | |
| color | string | |

**Relations:** Many-to-one → `Order`, Many-to-one → `Product`.

---

## 3. API endpoints

### App (no auth)

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api` | Hello message |
| GET | `/api/health` | Health check |

---

### Auth (`/api/auth`)

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/api/auth/register` | No | Register; returns user (no password) |
| POST | `/api/auth/login` | No | Login; returns `{ access_token }` |
| GET | `/api/auth/profile` | JWT | Current user (from token) |

**Register body (RegisterDto):** `email`, `password` (min 6), `firstName`, `lastName`  
**Login body (LoginDto):** `email`, `password`

---

### Users (`/api/users`) – all require JWT

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/users` | List all users |
| GET | `/api/users/:id` | Get user by ID |
| PATCH | `/api/users/:id` | Update user (body: fields to update) |
| DELETE | `/api/users/:id` | Delete user |

---

### Categories (`/api/categories`)

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/api/categories` | No | List all categories |
| GET | `/api/categories/:id` | No | Get by ID |
| GET | `/api/categories/slug/:slug` | No | Get by slug (e.g. `men`) |
| POST | `/api/categories` | JWT | Create category (admin) |
| PATCH | `/api/categories/:id` | JWT | Update category (admin) |
| DELETE | `/api/categories/:id` | JWT | Delete category (admin) |

**Create body (CreateCategoryDto):** `name`, `slug`, `description?`

---

### Products (`/api/products`)

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/api/products` | No | List with filters (see below) |
| GET | `/api/products/:id` | No | Get by ID |
| POST | `/api/products` | JWT | Create product (admin) |
| PATCH | `/api/products/:id` | JWT | Update product (admin) |
| DELETE | `/api/products/:id` | JWT | Delete product (admin) |

**Query params for GET `/api/products`:**  
`gender`, `categoryId`, `featured` (true/false), `limit`, `offset`

**Create body (CreateProductDto):**  
`name`, `description`, `price`, `images[]`, `categoryId`, `gender`, `sizes[]`, `colors[]`, `stock`, `featured?`

---

### Orders (`/api/orders`) – all require JWT

| Method | Path | Description |
|--------|------|-------------|
| POST | `/api/orders` | Create order (user = current user) |
| GET | `/api/orders` | List orders (user: own only; admin: all) |
| GET | `/api/orders/:id` | Get order by ID (user: own only; admin: any) |
| PATCH | `/api/orders/:id` | Update order status (admin) |
| DELETE | `/api/orders/:id` | Cancel/delete order |

**Create body (CreateOrderDto):**  
- `items`: `[{ productId, quantity, size, color }]`  
- `shippingAddress`: `{ street, city, state, zipCode, country }`

**Update body (UpdateOrderDto):** `status?` (enum: pending, processing, shipped, delivered, cancelled)

---

### Cart (`/api/cart`)

No REST endpoints; cart is handled on the frontend (e.g. Zustand). The `CartModule` exists for future use.

---

## 4. Auth flow (learning summary)

1. **Register** – `POST /api/auth/register` → user created, password hashed with bcrypt; response is user without password.
2. **Login** – `POST /api/auth/login` with email/password → validated via `LocalStrategy` → `AuthService` returns JWT.
3. **Protected routes** – Send header `Authorization: Bearer <access_token>`. `JwtAuthGuard` + `JwtStrategy` validate token and attach `req.user` (id, email, role, etc.).

**Guards:**  
- `JwtAuthGuard` – used on controllers that need a logged-in user.  
Role-based checks (e.g. admin-only) are done in services (e.g. by `req.user.role`), not by a separate guard in this project.

---

## 5. NestJS concepts used

| Concept | Where |
|--------|--------|
| **Modules** | `AppModule` imports feature modules (Auth, Users, Products, Categories, Orders, Cart). |
| **Controllers** | One per resource; define routes and use guards. |
| **Services** | Business logic and TypeORM repository usage. |
| **DTOs** | Request bodies validated with `class-validator`; documented with `@ApiProperty` for Swagger. |
| **Entities** | TypeORM entities in `src/entities/`. |
| **Guards** | `JwtAuthGuard` for protected routes. |
| **Strategies** | `LocalStrategy` (login), `JwtStrategy` (validate JWT). |
| **Pipes** | Global `ValidationPipe` for DTOs. |

---

## 6. Quick test with curl

```bash
# Health
curl http://localhost:3001/api/health

# Register
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"secret123","firstName":"Test","lastName":"User"}'

# Login (use token in next requests)
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"secret123"}'

# Protected route (replace TOKEN)
curl http://localhost:3001/api/auth/profile -H "Authorization: Bearer TOKEN"

# Public
curl "http://localhost:3001/api/categories"
curl "http://localhost:3001/api/products?limit=5"
```

For full request/response shapes, use **Swagger** at `http://localhost:3001/api/docs` when the backend is running.
