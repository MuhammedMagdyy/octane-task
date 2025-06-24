# Reading Recommendation System API

![NodeJS](https://img.shields.io/badge/Node.js-6DA55F?logo=node.js&logoColor=white) ![NestJS](https://img.shields.io/badge/NestJS-%23E0234E.svg?logo=nestjs&logoColor=white) ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=fff) ![Docker](https://img.shields.io/badge/Docker-2496ED?logo=docker&logoColor=fff) ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-336791?logo=postgresql&logoColor=fff) ![TypeORM](https://img.shields.io/badge/TypeORM-2D3748?logo=typeorm&logoColor=white) ![Postman](https://img.shields.io/badge/Postman-FF6C37?logo=postman&logoColor=white)

---

The Reading Recommendation System API was built using **Node.js**, **NestJS**, **TypeScript**, **PostgreSQL**, and **TypeORM**. It provides a simple and efficient way for users to submit their reading intervals and get recommendations for the top-rated books in the system. The API implements role-based authorization, logging, and exception handling, and unit tests to ensure secure, reliable, and maintainable code.

---

## 📚 Table of Contents

- [🌟 Features](#-features)
- [📖 API Documentation](#-api-documentation)
- [📚 Swagger](#-swagger)
- [🗄️ Database Schema](#️-database-schema)
- [🛠️ Getting Started](#️-getting-started)
  - [🐳 Docker Setup](#-docker-setup)

---

## 🌟 Features

- 🔒 **Authentication & Authorization**: with JWT - RBAC.
- ✅ **CRUD Operations**: for books (only admins).
- 📊 **Reading Intervals**: Users can submit their reading intervals.
- 📈 **Recommendations**: Get top-rated books based on reading intervals.

---

## 📖 API Documentation

### 📚 Swagger

[Swagger](https://swagger.io/) UI is available at `/api-docs` to explore the API endpoints

---

## 🗄️ Database Schema
![schema](https://github.com/user-attachments/assets/6fe519e3-b60f-4f12-8ebd-1ce44911c591)
---

## 🛠️ Getting Started

### 🐳 Docker Setup

The easiest way to get the application up and running is using Docker Compose, which will automatically set up both the API server and PostgreSQL database.

### Quick Start with Docker

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

### Docker Commands

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
