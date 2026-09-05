# AI Orbit — Companies

A full-stack company directory built as part of the AI Orbit assignment. The project focuses on building a clean, responsive company discovery experience backed by a structured API and PostgreSQL database.

## What it does

Users can:

* Browse AI companies
* Search companies by name or description
* Filter companies by category
* Sort companies by name or newest
* Navigate through paginated results
* Open a company's detailed profile
* View company information, products, and models
* Discover related companies
* Visit official company websites

The application also handles loading, empty, error, and 404 states.

## Tech Stack

**Frontend**

* Next.js
* TypeScript
* Tailwind CSS

**Backend**

* Next.js API Routes
* Zod validation
* Service-layer architecture

**Database**

* PostgreSQL
* Prisma ORM
* Neon

**Deployment**

* Vercel

## API

### Companies

```text
GET    /api/companies
POST   /api/companies
GET    /api/companies/:slug
PATCH  /api/companies/:slug
DELETE /api/companies/:slug
```

The companies listing API supports:

```text
search
category
sort
page
limit
```

Example:

```text
/api/companies?search=openai&sort=name&page=1&limit=12
```

### Categories

```text
GET /api/categories
```

Returns available categories along with their company counts.

## Project Structure

```text
app/
├── api/
│   ├── categories/
│   └── companies/
├── companies/
│   └── [slug]/
├── page.tsx
└── layout.tsx

components/
└── Header.tsx

lib/
├── services/
├── validations/
├── errors.ts
└── prisma.ts

prisma/
├── migrations/
├── schema.prisma
└── seed.ts
```

The backend follows a simple flow:

```text
Request
   ↓
API Route
   ↓
Validation
   ↓
Service Layer
   ↓
Prisma
   ↓
PostgreSQL
```

This keeps the API routes lightweight while keeping database and business logic in the service layer.

## Running locally

Clone the repository and install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
DATABASE_URL="your-postgresql-connection-string"
```

Run the database migrations:

```bash
npx prisma migrate dev
```

Seed the database:

```bash
npm run db:seed
```

Start the development server:

```bash
npm run dev
```

The application will be available at:

```text
http://localhost:3000
```

## Production

Live application:

[AI Orbit Companies — Live Demo](https://ai-orbit-companies-eight.vercel.app/?utm_source=chatgpt.com)

Source code:

[GitHub Repository](https://github.com/Zaid737/ai-orbit-companies?utm_source=chatgpt.com)

## Notes

This project was intentionally kept focused on the assignment requirements. The frontend demonstrates the backend functionality without adding unnecessary complexity, while the backend provides the main functionality through a structured REST API, validation, database relationships, filtering, searching, sorting, pagination, and CRUD operations.
