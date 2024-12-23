# Invoice Dashboard

A modern full-stack invoice management application built with TypeScript, featuring a NestJS backend and React frontend.

## Tech Stack

### Backend

- **NestJS**
- **PostgreSQL**
- **Prisma ORM**
- **JWT Authentication**
- **Zod**

### Frontend

- **React**
- **TypeScript**
- **Vite**
- **Redux Toolkit**
- **React Query**
- **React Router DOM**
- **TailwindCSS**
- **Zod**

## Prerequisites

- Node.js (v18 or higher)
- Docker and Docker Compose
- npm or yarn
- Git

## Project Structure

```
.
├── backend/         # NestJS API with Prisma
│   ├── prisma/     # Database schema and migrations
│   ├── src/        # Application source code
│   └── test/       # Test files
└── frontend/       # React application
    ├── src/        # Application source code
        ├── components/  # Reusable components
        ├── pages/      # Route components
        ├── store/      # Redux store configuration
        └── api/        # API integration
```

## Getting Started

1. Clone the repository:

```bash
git clone <repository-url>
cd InvoiceDashboard
```

2. Start PostgreSQL using Docker:

```bash
docker-compose up -d postgres
```

3. Backend Setup:

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Set up environment variables (configure .env file after this command)
cp .env.example .env

# Generate Prisma Client
npx prisma generate

# Run database migrations to create tables
npx prisma migrate dev

# Seed the database with initial data
npx prisma db seed

# Start the backend development server
npm run start:dev
```

4. Frontend Setup:

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start the frontend development server
npm run dev

# Demo Login Credentials
Username: demo@altametrics.com
Password: password1234
```

### Database Schema

The main entities are defined in `backend/prisma/schema.prisma`:

- Users
- Invoices

## API Routes

### Authentication

- `POST /auth/login` - User login

### Invoices

- `GET /invoices` - List all invoices
- `GET /invoices/:id` - Get invoice details
- `GET /invoices/total` - Get invoice totals

## Development

The application runs on:

- Backend API: http://localhost:3000
- Frontend: http://localhost:5173
- Prisma Studio: http://localhost:5555

  ## Preview
  ![image](https://github.com/user-attachments/assets/03a75311-2a92-47bb-a2fc-45d54a397eaa)
  ![image](https://github.com/user-attachments/assets/ff53649e-dfe7-40b1-9efd-31eab7b8de47)


