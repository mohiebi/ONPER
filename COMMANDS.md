# 🛠️ ONPER - Command Reference

All commands you need to work with ONPER.

---

## 🚀 Docker Commands

### Start Application
```bash
# Start all services (builds if needed)
docker-compose up

# Start in background
docker-compose up -d

# Force rebuild and start
docker-compose up --build

# Recreate everything
docker-compose up --build --force-recreate
```

### Stop Application
```bash
# Stop services (data persists)
docker-compose down

# Stop and remove volumes (fresh start)
docker-compose down -v

# Stop and remove everything
docker-compose down -v --rmi all
```

### View Logs
```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f postgres
```

### Container Access
```bash
# Access backend container shell
docker exec -it onper-backend sh

# Access frontend container shell
docker exec -it onper-frontend sh

# Access PostgreSQL
docker exec -it onper-db psql -U postgres -d onper
```

### Manage Containers
```bash
# List running containers
docker-compose ps

# Restart specific service
docker-compose restart backend

# Stop specific service
docker-compose stop frontend
```

---

## 🎯 Backend Commands

### Setup
```bash
cd backend

# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Generate Prisma Client
npx prisma generate

# Run database migrations
npx prisma migrate dev

# Seed database with sample data
npm run prisma:seed
```

### Development
```bash
cd backend

# Start dev server (hot reload)
npm run start:dev

# Start in debug mode
npm run start:debug

# Build for production
npm run build

# Run production build
npm run start:prod
```

### Database Management
```bash
cd backend

# Open Prisma Studio (database GUI)
npx prisma studio

# Create new migration
npx prisma migrate dev --name your_migration_name

# Reset database (CAUTION: deletes all data)
npx prisma migrate reset

# Generate Prisma Client
npx prisma generate

# Format schema file
npx prisma format

# View database schema
npx prisma db pull
```

### Testing
```bash
cd backend

# Run unit tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:cov

# Run e2e tests
npm run test:e2e
```

### Code Quality
```bash
cd backend

# Run linter
npm run lint

# Format code
npm run format
```

---

## 🎨 Frontend Commands

### Setup
```bash
cd frontend

# Install dependencies
npm install

# Copy environment file
cp .env.example .env
```

### Development
```bash
cd frontend

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Code Quality
```bash
cd frontend

# Run linter
npm run lint

# Type check
npm run type-check
```

---

## 🗄️ Database Commands

### Direct PostgreSQL Access
```bash
# Via Docker
docker exec -it onper-db psql -U postgres -d onper

# Via local psql (if installed)
psql -h localhost -p 5432 -U postgres -d onper
```

### PostgreSQL Commands (inside psql)
```sql
-- List all tables
\dt

-- Describe table structure
\d users
\d trainings
\d motivation_logs

-- View all users
SELECT * FROM users;

-- View all trainings
SELECT * FROM trainings;

-- View motivation logs
SELECT * FROM motivation_logs;

-- Count records
SELECT COUNT(*) FROM users;

-- Exit
\q
```

### Backup & Restore
```bash
# Backup database
docker exec onper-db pg_dump -U postgres onper > backup.sql

# Restore database
docker exec -i onper-db psql -U postgres onper < backup.sql
```

---

## 🧪 Testing API with cURL

### Authentication
```bash
# Register new user
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "name": "Test User",
    "password": "test123",
    "goal": "FULL",
    "level": "BEGINNER"
  }'

# Login
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "test123"
  }'

# Save the token from response
TOKEN="your_token_here"
```

### User Management
```bash
# Get profile
curl http://localhost:3000/users/profile \
  -H "Authorization: Bearer $TOKEN"

# Update profile
curl -X PATCH http://localhost:3000/users/profile \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "goal": "HALF",
    "level": "INTERMEDIATE"
  }'
```

### Training Sessions
```bash
# Create training
curl -X POST http://localhost:3000/training \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "date": "2024-01-20",
    "distance": 5.0,
    "duration": 30,
    "mood": "NORMAL",
    "completed": true,
    "notes": "Great run!"
  }'

# Get all trainings
curl http://localhost:3000/training \
  -H "Authorization: Bearer $TOKEN"

# Get specific training
curl http://localhost:3000/training/{id} \
  -H "Authorization: Bearer $TOKEN"

# Update training
curl -X PATCH http://localhost:3000/training/{id} \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "completed": true
  }'

# Delete training
curl -X DELETE http://localhost:3000/training/{id} \
  -H "Authorization: Bearer $TOKEN"

# Generate training plan
curl "http://localhost:3000/training/plan?goal=FULL&level=BEGINNER" \
  -H "Authorization: Bearer $TOKEN"
```

### Motivation
```bash
# Get motivation history
curl http://localhost:3000/motivation/history \
  -H "Authorization: Bearer $TOKEN"

# Get latest motivation
curl http://localhost:3000/motivation/latest \
  -H "Authorization: Bearer $TOKEN"

# Check milestones
curl -X POST http://localhost:3000/motivation/check-milestones \
  -H "Authorization: Bearer $TOKEN"
```

---

## 📊 Monitoring & Debugging

### View Application Logs
```bash
# Backend logs
docker-compose logs -f backend

# Frontend logs
docker-compose logs -f frontend

# Database logs
docker-compose logs -f postgres

# Last 100 lines
docker-compose logs --tail=100 backend
```

### Check Health
```bash
# Backend health
curl http://localhost:3000

# Frontend health
curl http://localhost:5173

# API docs
curl http://localhost:3000/api
```

### Resource Usage
```bash
# View container resource usage
docker stats

# View disk usage
docker system df

# Clean up unused resources
docker system prune
```

---

## 🔧 Development Workflow

### Fresh Start
```bash
# 1. Clone/Navigate to project
cd ONPER

# 2. Start everything with Docker
docker-compose up --build

# 3. Open in browser
# Frontend: http://localhost:5173
# API Docs: http://localhost:3000/api
```

### Backend Development
```bash
# Terminal 1: Start database only
docker-compose up postgres

# Terminal 2: Backend dev mode
cd backend
npm run start:dev

# Terminal 3: Prisma Studio
cd backend
npx prisma studio
```

### Frontend Development
```bash
# Terminal 1: Start backend (Docker or local)
docker-compose up postgres backend

# Terminal 2: Frontend dev mode
cd frontend
npm run dev
```

### Full Local Development
```bash
# Terminal 1: Database
docker-compose up postgres

# Terminal 2: Backend
cd backend
npm run start:dev

# Terminal 3: Frontend
cd frontend
npm run dev

# Terminal 4: Prisma Studio
cd backend
npx prisma studio
```

---

## 🛠️ Troubleshooting Commands

### Clear Node Modules
```bash
# Backend
cd backend
rm -rf node_modules package-lock.json
npm install

# Frontend
cd frontend
rm -rf node_modules package-lock.json
npm install
```

### Reset Database
```bash
cd backend
npx prisma migrate reset
npm run prisma:seed
```

### Clear Docker Cache
```bash
# Remove all stopped containers
docker container prune

# Remove all unused images
docker image prune -a

# Remove all unused volumes
docker volume prune

# Remove everything
docker system prune -a --volumes
```

### Check Ports
```bash
# Linux/Mac
lsof -i :3000
lsof -i :5173
lsof -i :5432

# Windows (PowerShell)
netstat -ano | findstr :3000
netstat -ano | findstr :5173
netstat -ano | findstr :5432
```

### Fix Permission Issues (Linux/Mac)
```bash
# Backend
cd backend
sudo chown -R $USER:$USER node_modules

# Frontend
cd frontend
sudo chown -R $USER:$USER node_modules
```

---

## 📦 Production Deployment Commands

### Build Production Images
```bash
# Build all services
docker-compose build

# Build specific service
docker-compose build backend
docker-compose build frontend
```

### Run Production Mode
```bash
# Start with production config
docker-compose -f docker-compose.prod.yml up -d
```

### Export Database
```bash
# Export schema
cd backend
npx prisma db push

# Export data
docker exec onper-db pg_dump -U postgres onper > production_backup.sql
```

---

## 🎓 Learning Commands

### Explore Prisma
```bash
cd backend

# Interactive Prisma CLI
npx prisma

# View help for specific command
npx prisma migrate --help
npx prisma studio --help
```

### Explore NestJS
```bash
cd backend

# NestJS CLI help
npx nest --help

# Generate new module
npx nest generate module feature-name

# Generate new controller
npx nest generate controller feature-name

# Generate new service
npx nest generate service feature-name
```

### Explore Vue
```bash
cd frontend

# Vite commands
npx vite --help

# Vue devtools
# Install browser extension: Vue.js devtools
```

---

## 📝 Git Commands (Common)

```bash
# Check status
git status

# Add all changes
git add .

# Commit changes
git commit -m "Description of changes"

# Push to remote
git push

# Pull latest changes
git pull

# Create new branch
git checkout -b feature-name

# Switch branch
git checkout main
```

---

## 🔑 Environment Variables

### Backend (.env)
```bash
# Create from example
cp backend/.env.example backend/.env

# Edit
nano backend/.env
# or
code backend/.env
```

### Frontend (.env)
```bash
# Create from example
cp frontend/.env.example frontend/.env

# Edit
nano frontend/.env
# or
code frontend/.env
```

---

## 🎯 Quick Commands

```bash
# One-liner to start everything
cd ONPER && docker-compose up --build

# One-liner to stop and clean
docker-compose down -v

# One-liner to restart
docker-compose restart

# View all running services
docker-compose ps

# Follow all logs
docker-compose logs -f
```

---

## 📚 Where to Get Help

- **Documentation**: Check the `.md` files in the project root
- **API Docs**: http://localhost:3000/api
- **Prisma Studio**: http://localhost:5555
- **Issues**: Check your terminal output for errors

---

**Pro Tip**: Keep this file open while developing for quick command reference!

