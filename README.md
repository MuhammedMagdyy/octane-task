# 📚 Reading Recommendation System API

![NodeJS](https://img.shields.io/badge/Node.js-6DA55F?logo=node.js&logoColor=white)
![NestJS](https://img.shields.io/badge/NestJS-%23E0234E.svg?logo=nestjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=fff)
![Docker](https://img.shields.io/badge/Docker-2496ED?logo=docker&logoColor=fff)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-336791?logo=postgresql&logoColor=fff)
![TypeORM](https://img.shields.io/badge/TypeORM-2D3748?logo=typeorm&logoColor=white)
![Postman](https://img.shields.io/badge/Postman-FF6C37?logo=postman&logoColor=white)

---

The **Reading Recommendation System API** is built with **Node.js**, **NestJS**, **TypeScript**, **PostgreSQL**, and **TypeORM**. It enables users to submit their reading intervals and receive recommendations for top-rated books.

The API implements:

- ✅ **Role-based authorization** (RBAC) with JWT.
- ✅ Logging and global exception handling.
- ✅ Unit testing for reliability and maintainability.

---

## 📑 Table of Contents

- [✨ Features](#-features)
- [📖 API Documentation](#-api-documentation)
- [📚 Swagger](#-swagger)
- [🗄️ Database](#️-database)
  - [📌 Tables Overview](#-tables-overview)
  - [📌 Schema](#-schema)
  - [📌 Flowchart](#-flowchart)
- [⚙️ Getting Started](#️-getting-started)
  - [🐳 Docker Setup](#-docker-setup)

---

## ✨ Features

- 🔐 **Authentication & Authorization**: JWT-based with Role-Based Access Control.
- 📚 **CRUD Operations**: Full book management (admin only).
- 📊 **Reading Intervals Tracking**: Users can log their reading activity.
- 📈 **Recommendations**: Retrieve top-rated books based on reading behavior.

---

## 📖 API Documentation

Explore the full API using the interactive **Swagger UI**.

### 📚 Swagger

Access Swagger UI at: [`/api-docs`](http://localhost:3000/api-docs)  
[Swagger](https://swagger.io/) provides complete details of all endpoints, request/response structures, and available operations.

---

## 🗄️ Database

### 📌 Tables Overview

- 👤 **Users Table**: Stores user data and handles authentication/authorization.
- 📘 **Books Table**: Stores book details and supports CRUD operations (admin only).
- 📏 **Reading Intervals Table**: Logs each user's reading sessions.
- 🔢 **Distinct Intervals Table**: Optimizes operations by storing unique intervals.
- 📊 **Book Stats Table**: Supports analytics and top-books recommendations.

---

### 📌 Schema

![Database Schema](https://github.com/user-attachments/assets/8cabaf7c-f94e-4457-a063-978dc95ac642)

---

### 📌 Flowchart

![flowchart](https://github.com/user-attachments/assets/351cb385-a011-4d37-b8b6-bb180a1e1a27)

---

## ⚙️ Getting Started

### 🐳 Docker Setup

The easiest way to run the application is with **Docker Compose**, which sets up the API server and the PostgreSQL database automatically.

---

### 🚀 Quick Start with Docker

1. **Clone the repository**

   ```bash
   git clone https://github.com/MuhammedMagdyy/octane-task.git
   cd octane-task
   ```

2. **Create environment file**

   ```bash
   cp .env.example .env
   ```

3. **Build and start the application**

   ```bash
   docker-compose up --build
   ```

### Docker Commands for Reference

```bash
# Start the application in detached mode
docker-compose up -d

# View logs
docker-compose logs -f

# Stop the application
docker-compose down

# Rebuild and start
docker-compose up --build

# Remove containers and volumes
docker-compose down -v

```

🚀 **Happy Coding!**
