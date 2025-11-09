# Backend — Product Management API

A RESTful API built with **NestJS**, **TypeORM**, and **PostgreSQL**, providing secure authentication, user management, and CRUD operations for products.
Designed for scalability, type safety, and easy integration with a Next.js frontend.

---

## Tech Stack

**Backend Framework:** NestJS (v11)
**Database:** PostgreSQL
**ORM:** TypeORM
**Authentication:** JWT + Passport
**Validation:** class-validator + class-transformer
**Environment Management:** @nestjs/config
**Hashing:** bcrypt
**Language:** TypeScript

---

## ⚙️ Setup & Installation

### 1. Install Dependencies

```bash
npm install
```

### 2. Setup Environment Variables

Create a `.env` file in the root directory and add your configurations:

```bash
# Application
NODE_ENV=development
BACKEND_PORT=3001

# PostgreSQL
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_USER=postgres
POSTGRES_PASSWORD=yourpassword
POSTGRES_DB=products_db

# JWT
JWT_SECRET=your_jwt_secret
```

---

## Scripts

| Command                | Description                               |
| ---------------------- | ----------------------------------------- |
| `npm run start`        | Start the app in production mode          |
| `npm run start:dev`    | Start the app in watch mode (development) |
| `npm run build`        | Build the app for production              |
| `npm run format`       | Format all files using Prettier           |
| `npm run lint`         | Lint and fix issues                       |
| `npm run test`         | Run all Jest tests                        |
| `npm run create:admin` | Create an admin user (via script)         |

---

## **API Endpoints**

### **Auth**

| Method | Endpoint             | Description                               |
| ------ | -------------------- | ----------------------------------------- |
| `POST` | `/api/v1/auth/login` | Authenticate user and receive a JWT token |

---

### **Users**

> These routes are **not publicly exposed** — user creation and lookup are handled internally by the authentication module.

| Method     | Endpoint                     | Description                                                      |
| ---------- | ---------------------------- | ---------------------------------------------------------------- |
| _Internal_ | `UsersService.create()`      | Create a new user (used internally during registration or setup) |
| _Internal_ | `UsersService.findByEmail()` | Find user by email (used during login validation)                |

---

### **Products**

| Method   | Endpoint               | Description          | Auth Required |
| -------- | ---------------------- | -------------------- | ------------- |
| `GET`    | `/api/v1/products`     | Fetch all products   | ❌ No         |
| `POST`   | `/api/v1/products`     | Create a new product | ✅ Yes        |
| `DELETE` | `/api/v1/products/:id` | Delete a product     | ✅ Yes        |

---

## Validation Rules

**Product DTOs**

- `name` — must be a non-empty string
- `price` — must be a positive number
- `description` — optional string

**User DTOs**

- `email` — must be valid
- `password` — must be at least 8 characters

---

## Response Format

Every API response follows a consistent structure:

```json
{
  "success": true,
  "data": { "id": "123", "name": "Sample Product" },
  "message": "Product created successfully"
}
```

On errors:

```json
{
  "success": false,
  "message": "Product not found"
}
```

---

## Development Notes

- All routes are prefixed with `/api/v1`
- DTO validation is globally enabled
- CORS is enabled for frontend integration
- Use `Logger` instead of `console.log` for production logs
- Database auto-sync is **disabled** in production

---

## Deployment Notes

1. Build the project:

   ```bash
   npm run build
   ```

2. Start the compiled app:

   ```bash
   npm run start:prod
   ```

3. Ensure environment variables are correctly configured on your server.

---

## Author

**Vrunda Joshi**
Full Stack Developer (NestJS / Next.js)
[LinkedIn](https://linkedin.com/in/vrundajoshi) • [GitHub](https://github.com/vrundajoshi)
