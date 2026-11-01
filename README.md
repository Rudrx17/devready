# DevReady

A personalized, cold-start-aware technical interview preparation platform.

## Stack
React.js, Spring Boot, PostgreSQL, Judge0, Gemini API

## Structure
- `frontend/` React app
- `backend/` Spring Boot API
- `docker/` Compose files and service configs (TODO: Month 2, Judge0)
- `docs/` PRD, synopsis, build guide

## Local setup
- JDK 21, Maven, PostgreSQL 15+
- Create the DB as the postgres superuser: `CREATE USER devready WITH PASSWORD '<your-password>'; CREATE DATABASE devready OWNER devready;`
- Copy `backend/.env.example` to `backend/.env` and fill in `DB_PASSWORD` and `JWT_SECRET` (never commit `.env`)
- Generate a JWT secret (PowerShell): `[Convert]::ToBase64String((1..48 | % { Get-Random -Max 256 }))`
- Backend: `cd backend; .\mvnw.cmd spring-boot:run`

## API (Month 1)
- `POST /api/auth/register`, `POST /api/auth/login` (public)
- `GET /api/me` (needs `Authorization: Bearer <jwt>`)

## Team
Riya Lahukar, Ankita Utture, Gururaj Shinde, Sahil Valiv, Rudraksh Ghodake

Guide: Prof. D. A. Jadhav
