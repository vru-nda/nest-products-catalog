# Product Catalog Frontend

A **Next.js 16** application built with **React 19**, **TypeScript**, and **Tailwind CSS 4**, serving as the frontend for the Product Catalog system.

It integrates with a NestJS backend API for authentication and product management.

---

## Features

- JWT-based authentication (login/logout)
- Product listing (public)
- Add and delete products (protected routes)
- Search and filter functionality for products
- Hooks-based state management
- Axios-based API integration

---

## Setup Instructions

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Create a `.env` file in the root directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api/v1
```

_(Update the backend URL if necessary.)_

---

## Running the Application

### Development

```bash
npm run dev
```

Starts the Next.js development server at `http://localhost:3000`.

### Production

```bash
npm run build
npm start
```

Builds and runs the production server.

### Linting

```bash
npm run lint
```

Runs ESLint for code quality checks.

---

## Authentication Flow

- The login page (`/login`) authenticates users via JWT.
- Access tokens are stored in `localStorage`.
- Protected routes (e.g., `/create`) and product modifications require authentication.
- The home page (`/`) displays public product listings.

---

## Author

**Vrunda Joshi**
Full Stack Developer (NestJS / Next.js)
[LinkedIn](https://linkedin.com/in/vrundajoshi) • [GitHub](https://github.com/vrundajoshi)
