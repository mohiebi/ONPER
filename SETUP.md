# ONPER Setup Guide

## 🚀 Quick Start with Docker (Recommended)

The easiest way to run ONPER is using Docker Compose:

```bash
# 1. Clone the repository
cd ONPER

# 2. Create environment files
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env

# 3. Start all services
docker-compose up --build
```

That's it! The application will be available at:
- Frontend: http://localhost:5173
- Backend API: http://localhost:3000
- API Documentation: http://localhost:3000/api

---

## 🛠️ Local Development Setup

### Prerequisites

- Node.js 18+ 
- PostgreSQL 15+
- npm or yarn

### Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Setup database URL in .env
echo 'DATABASE_URL="postgresql://postgres:postgres@localhost:5432/onper"' > .env
echo 'JWT_SECRET="your-secret-key"' >> .env
echo 'PORT=3000' >> .env

# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev

# Seed database with sample data
npm run prisma:seed

# Start development server
npm run start:dev
```

Backend will be available at http://localhost:3000

### Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Setup API URL in .env
echo 'VITE_API_URL=http://localhost:3000' > .env

# Start development server
npm run dev
```

Frontend will be available at http://localhost:5173

---

## 📊 Database Management

### View Database

```bash
cd backend
npx prisma studio
```

This opens a web interface at http://localhost:5555 to view and edit database records.

### Create New Migration

```bash
cd backend
npx prisma migrate dev --name your_migration_name
```

### Reset Database

```bash
cd backend
npx prisma migrate reset
```

---

## 🧪 Testing

### Backend Tests

```bash
cd backend
npm run test
npm run test:cov  # with coverage
```

### Frontend Tests

```bash
cd frontend
npm run test
```

---

## 🔧 Environment Variables

### Backend (.env)

```env
DATABASE_URL="postgresql://user:password@localhost:5432/onper"
JWT_SECRET="your-super-secret-jwt-key-change-in-production"
PORT=3000
NODE_ENV=development
```

### Frontend (.env)

```env
VITE_API_URL=http://localhost:3000
```

---

## 📦 Building for Production

### Backend

```bash
cd backend
npm run build
npm run start:prod
```

### Frontend

```bash
cd frontend
npm run build
# Build output will be in dist/
```

---

## 🐳 Docker Commands

```bash
# Start services
docker-compose up

# Start in background
docker-compose up -d

# Rebuild containers
docker-compose up --build

# Stop services
docker-compose down

# View logs
docker-compose logs -f

# Access backend container
docker exec -it onper-backend sh

# Access database
docker exec -it onper-db psql -U postgres -d onper
```

---

## 🔍 Troubleshooting

### Port already in use

If ports 3000, 5173, or 5432 are already in use, you can:

1. Stop other services using those ports
2. Or modify the ports in `docker-compose.yml`

### Database connection issues

1. Ensure PostgreSQL is running
2. Check DATABASE_URL in backend/.env
3. Try resetting the database: `npx prisma migrate reset`

### Frontend not connecting to backend

1. Check VITE_API_URL in frontend/.env
2. Ensure backend is running on port 3000
3. Check browser console for CORS errors

---

## 📚 API Documentation

Once the backend is running, access the Swagger documentation at:

http://localhost:3000/api

Here you can:
- View all available endpoints
- Test API calls directly
- See request/response schemas

---

## 🎯 Default Test Account

After running the seed script, you can login with:

- Email: demo@onper.com
- Password: demo123

---

## 📝 Project Structure

```
ONPER/
├── backend/              # NestJS API
│   ├── src/
│   │   ├── auth/         # Authentication
│   │   ├── user/         # User management
│   │   ├── training/     # Training sessions
│   │   ├── motivation/   # Motivation system
│   │   ├── notification/ # Notifications
│   │   └── prisma/       # Database
│   └── prisma/
│       └── schema.prisma # Database schema
├── frontend/             # Vue 3 app
│   └── src/
│       ├── api/          # API client
│       ├── components/   # Vue components
│       ├── stores/       # Pinia stores
│       ├── views/        # Page views
│       └── router/       # Vue Router
└── docker-compose.yml    # Docker configuration
```

---

## 🤝 Need Help?

- Check the README.md for more information
- Review API docs at /api endpoint
- Check issues on GitHub

Happy running! 🏃‍♂️

