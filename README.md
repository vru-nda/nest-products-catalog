# Product Catalog System

A full-stack **Product Catalog Application** built with **Next.js (frontend)** and **NestJS (backend)**.
The system supports **JWT authentication**, **product management**, and a **modern responsive UI** — designed for scalability, clarity, and developer productivity.

---

## Overview

This project consists of two main parts:

| Folder                    | Description                                                                                         | Tech Stack                                       |
| ------------------------- | --------------------------------------------------------------------------------------------------- | ------------------------------------------------ |
| [`frontend/`](./frontend) | The client-side Next.js application. Handles UI, authentication, and API integration.               | Next.js 16, React 19, TypeScript, Tailwind CSS 4 |
| [`backend/`](./backend)   | The NestJS REST API. Handles user authentication, product CRUD, and PostgreSQL database operations. | NestJS 11, TypeORM, PostgreSQL, JWT              |

---

## Prerequisites

Before running the project, ensure you have:

- **Node.js** (v20 or later)
- **npm** or **yarn**
- **PostgreSQL** (running locally or remotely)

---

## Setup Instructions

### 1. Install Dependencies

Install dependencies for both backend and frontend:

```bash
cd backend && npm install
cd ../frontend && npm install
```

### 2. Configure Environment Variables

Each part has its own `.env` file:

- [Backend Environment Setup](./backend/README.md#3-setup-environment-variables)
- [Frontend Environment Setup](./frontend/README.md#3-configure-environment-variables)

---

## ▶️ Running the Project

Start backend and frontend servers in separate terminals.

### **Backend**

```bash
cd backend
npm run start:dev
```

### **Frontend**

```bash
cd frontend
npm run dev
```

Frontend will run by default on [http://localhost:3000](http://localhost:3000),
and backend on [http://localhost:3001](http://localhost:3001).

---

## 📂 Folder Structure

```
project-root/
├── backend/      # NestJS API
├── frontend/     # Next.js client app
└── README.md     # This file
```

---

## 📖 Detailed Documentation

- [Frontend README](./frontend/README.md)
- [Backend README](./backend/README.md)

Each folder contains setup, API details, and developer notes.

---

## Author

**Vrunda Joshi**
Full Stack Developer (NestJS / Next.js)
[LinkedIn](https://linkedin.com/in/vrundajoshi) • [GitHub](https://github.com/vrundajoshi)
