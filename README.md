# 🏃 ONPER (One Percent Runner)

**Train for marathons. Join the 1%.**

ONPER is a premium running application that helps users train for marathons with personalized training plans, progress tracking, and an intelligent motivation system.

---

## 🚀 Quick Start

### Prerequisites
- Docker & Docker Compose
- Node.js 18+ (for local development)
- PostgreSQL (handled by Docker)

### Run the Application

```bash
# Clone and navigate to project
cd ONPER

# Start all services with Docker
docker-compose up
```

**Services will be available at:**
- Frontend: http://localhost:8080
- Backend API: http://localhost:3000
- API Documentation: http://localhost:3000/api

### Initial Database Setup

After starting the containers for the first time, initialize the database:

```bash
# Run migrations to create tables
docker exec onper-backend npx prisma migrate dev --name init

# Seed the database with demo data
docker exec onper-backend npx prisma db seed
```

**Demo Account Credentials:**
- Email: `demo@onper.com`
- Password: `demo123`

> 📖 See [DATABASE_SETUP.md](DATABASE_SETUP.md) for detailed database management instructions.

---

## 📁 Project Structure

```
ONPER/
├── backend/              # NestJS API
│   ├── src/
│   │   ├── auth/         # Authentication module
│   │   ├── user/         # User management
│   │   ├── training/     # Training sessions
│   │   ├── motivation/   # Motivation system
│   │   ├── notification/ # Notifications & reminders
│   │   └── prisma/       # Database schema & migrations
│   └── test/
├── frontend/             # Vue 3 application
│   ├── src/
│   │   ├── components/   # Reusable components
│   │   ├── views/        # Page components
│   │   ├── stores/       # Pinia state management
│   │   ├── api/          # API client
│   │   └── router/       # Vue Router
└── docker-compose.yml
```

---

## 🛠️ Tech Stack

### Frontend
- **Vue 3** with Composition API
- **Vite** for blazing fast builds
- **TailwindCSS** for styling
- **Pinia** for state management
- **Framer Motion** for animations

### Backend
- **NestJS** (TypeScript)
- **Prisma ORM** with PostgreSQL
- **JWT** authentication
- **Swagger/OpenAPI** documentation

---

## 🎯 Core Features

1. **User Authentication** - Secure JWT-based signup/login
2. **Goal Setting** - Choose running goal (5K, 10K, Half, Full Marathon)
3. **Training Plans** - Auto-generated 8-20 week programs
4. **Progress Tracking** - Log workouts and track completion
5. **Motivation System** - Dynamic encouragement messages
6. **Dashboard** - Visual progress and upcoming workouts

---

## 🔧 Development

### Backend Development

```bash
cd backend
npm install
npm run start:dev
```

### Frontend Development

```bash
cd frontend
npm install
npm run dev
```

### Database Management

```bash
cd backend
npx prisma migrate dev
npx prisma studio
```

---

## 🌍 Environment Variables

Create `.env` files in both backend and frontend directories:

**backend/.env**
```
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/onper"
JWT_SECRET="your-super-secret-jwt-key-change-in-production"
PORT=3000
```

**frontend/.env**
```
VITE_API_URL=http://localhost:3000
```

---

## 📚 Documentation

ONPER includes comprehensive documentation:

| Document | Description |
|----------|-------------|
| **[INDEX.md](INDEX.md)** | 📚 **START HERE** - Complete documentation index |
| **[QUICKSTART.md](QUICKSTART.md)** | 🚀 Get running in 5 minutes |
| **[SETUP.md](SETUP.md)** | 🛠️ Detailed installation guide |
| **[ARCHITECTURE.md](ARCHITECTURE.md)** | 🏗️ System design and patterns |
| **[API_ENDPOINTS.md](API_ENDPOINTS.md)** | 📡 Complete API reference |
| **[PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)** | 📋 Features and tech stack |
| **[FILE_STRUCTURE.md](FILE_STRUCTURE.md)** | 📁 Project file organization |
| **[SYSTEM_DIAGRAM.md](SYSTEM_DIAGRAM.md)** | 📊 Visual diagrams and flows |
| **[COMMANDS.md](COMMANDS.md)** | ⌨️ All commands reference |

### Interactive API Docs
Once the backend is running, visit:
- **Swagger UI**: http://localhost:3000/api
- **Prisma Studio**: `cd backend && npx prisma studio`

---

## 🧪 Testing

```bash
# Backend tests
cd backend
npm run test
npm run test:cov    # with coverage
npm run test:e2e    # end-to-end

# Frontend tests
cd frontend
npm run test
```

---

## 🎨 Design Philosophy

- **Minimal & Premium** - Clean interface focused on motivation
- **Responsive First** - Works seamlessly on mobile and desktop
- **User-Centric** - Every feature drives the user toward their goal
- **SOLID Principles** - Maintainable and scalable architecture
- **Type-Safe** - TypeScript throughout for reliability

---

## 🌟 Core Feature: Motivation System

ONPER's motivation system is the heart of the application:
- **40 unique motivational messages** across 4 trigger types
- **Automatic triggering** on training completion, milestones, and reminders
- **Personalized delivery** based on user actions
- **Ready for AI upgrade** - architecture supports future integration

See `backend/src/motivation/motivation.service.ts` for implementation.

---

## 🚀 What's Next?

### Potential Enhancements
1. **AI-Powered Motivation** - Integrate OpenAI for personalized messages
2. **Push Notifications** - Real mobile notifications (FCM/APNs)
3. **Social Features** - Friends, challenges, leaderboards
4. **Wearable Integration** - Sync with Garmin, Apple Watch, etc.
5. **Mobile App** - Native iOS/Android with same API
6. **Advanced Analytics** - Progress visualization and insights

See [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md) for detailed enhancement roadmap.

---

## 🤝 Contributing

1. Read the [ARCHITECTURE.md](ARCHITECTURE.md) documentation
2. Follow TypeScript strict mode
3. Use ESLint and Prettier (configs included)
4. Write tests for new features
5. Update documentation as needed

---

## 📄 License

MIT License - Built with ❤️ for runners worldwide

---

## 🏃 Join the 1%

**ONPER** helps you become part of the less than 1% of humans who can complete a full marathon.

Start your journey today:
```bash
docker-compose up --build
```

Then visit: http://localhost:5173

---

**"Yesterday you were ahead of 99% of people — today just beat yourself."**

