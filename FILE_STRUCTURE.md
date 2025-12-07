# 📁 ONPER - Complete File Structure

```
ONPER/
│
├── 📄 README.md                      # Main project documentation
├── 📄 QUICKSTART.md                  # 5-minute setup guide
├── 📄 SETUP.md                       # Detailed setup instructions
├── 📄 ARCHITECTURE.md                # System architecture documentation
├── 📄 API_ENDPOINTS.md               # Complete API reference
├── 📄 PROJECT_SUMMARY.md             # Project overview and features
├── 📄 FILE_STRUCTURE.md              # This file
├── 📄 docker-compose.yml             # Multi-container orchestration
└── 📄 .gitignore                     # Git ignore rules
│
├── 🎯 backend/                       # NestJS Backend API
│   │
│   ├── 📂 src/                       # Source code
│   │   │
│   │   ├── 🔐 auth/                  # Authentication Module
│   │   │   ├── auth.module.ts       # Module definition
│   │   │   ├── auth.controller.ts   # /auth endpoints
│   │   │   ├── auth.service.ts      # Auth business logic
│   │   │   ├── 📂 strategies/
│   │   │   │   └── jwt.strategy.ts  # JWT validation
│   │   │   ├── 📂 guards/
│   │   │   │   └── jwt-auth.guard.ts # Route protection
│   │   │   ├── 📂 decorators/
│   │   │   │   └── current-user.decorator.ts
│   │   │   └── 📂 dto/
│   │   │       ├── register.dto.ts
│   │   │       └── login.dto.ts
│   │   │
│   │   ├── 👤 user/                  # User Management Module
│   │   │   ├── user.module.ts
│   │   │   ├── user.controller.ts   # /users endpoints
│   │   │   ├── user.service.ts      # User CRUD operations
│   │   │   └── 📂 dto/
│   │   │       └── update-user.dto.ts
│   │   │
│   │   ├── 🏃 training/              # Training Sessions Module
│   │   │   ├── training.module.ts
│   │   │   ├── training.controller.ts # /training endpoints
│   │   │   ├── training.service.ts   # Training logic + plan generation
│   │   │   └── 📂 dto/
│   │   │       ├── create-training.dto.ts
│   │   │       └── update-training.dto.ts
│   │   │
│   │   ├── 💪 motivation/            # 🌟 CORE: Motivation System Module
│   │   │   ├── motivation.module.ts
│   │   │   ├── motivation.controller.ts # /motivation endpoints
│   │   │   └── motivation.service.ts # Message bank (40 messages)
│   │   │                              # Trigger logic (4 types)
│   │   │                              # Milestone detection
│   │   │
│   │   ├── 🔔 notification/          # Notification Module
│   │   │   ├── notification.module.ts
│   │   │   ├── notification.controller.ts
│   │   │   └── notification.service.ts # Reminder system (MVP: simulated)
│   │   │
│   │   ├── 🗄️ prisma/                # Database Access Layer
│   │   │   ├── prisma.module.ts
│   │   │   └── prisma.service.ts    # Database connection
│   │   │
│   │   ├── main.ts                  # Application entry point
│   │   └── app.module.ts            # Root module
│   │
│   ├── 📂 prisma/                    # Prisma ORM
│   │   ├── schema.prisma            # Database schema definition
│   │   │                            # Tables: users, trainings, motivation_logs
│   │   └── seed.ts                  # Database seeder (demo data)
│   │
│   ├── 📂 test/                      # Test files
│   │
│   ├── 📄 package.json               # Dependencies
│   ├── 📄 tsconfig.json              # TypeScript config
│   ├── 📄 nest-cli.json              # NestJS CLI config
│   ├── 📄 .eslintrc.js               # ESLint config
│   ├── 📄 .prettierrc                # Prettier config
│   ├── 📄 .env.example               # Environment template
│   └── 📄 Dockerfile                 # Backend container
│
└── 🎨 frontend/                      # Vue 3 Frontend Application
    │
    ├── 📂 src/                       # Source code
    │   │
    │   ├── 🌐 api/                   # API Client Layer
    │   │   ├── client.ts            # Axios instance + interceptors
    │   │   ├── auth.ts              # Auth API calls
    │   │   ├── user.ts              # User API calls
    │   │   ├── training.ts          # Training API calls
    │   │   └── motivation.ts        # Motivation API calls
    │   │
    │   ├── 🧩 components/            # Reusable Vue Components
    │   │   ├── Navbar.vue           # Top navigation bar
    │   │   ├── StatCard.vue         # Statistics display card
    │   │   ├── MotivationCard.vue   # Motivation message card
    │   │   └── LoadingSpinner.vue   # Loading indicator
    │   │
    │   ├── 📄 views/                 # Page Components (Routes)
    │   │   ├── LandingView.vue      # / - Landing page
    │   │   ├── LoginView.vue        # /login - Login form
    │   │   ├── RegisterView.vue     # /register - Registration
    │   │   ├── SetupView.vue        # /setup - Goal & level wizard
    │   │   ├── DashboardView.vue    # /dashboard - Main dashboard
    │   │   ├── TrainingDetailView.vue # /training/:id - Workout details
    │   │   ├── MotivationView.vue   # /motivation - Motivation feed
    │   │   └── NotFoundView.vue     # 404 page
    │   │
    │   ├── 🗃️ stores/                # Pinia State Management
    │   │   ├── auth.ts              # Auth state (user, token, login/logout)
    │   │   ├── training.ts          # Training state (sessions, plans)
    │   │   └── motivation.ts        # Motivation state (messages, history)
    │   │
    │   ├── 🧭 router/                # Vue Router
    │   │   └── index.ts             # Route definitions + guards
    │   │
    │   ├── 📝 types/                 # TypeScript Definitions
    │   │   └── index.ts             # Interfaces (User, Training, etc.)
    │   │
    │   ├── 🛠️ utils/                # Utility Functions
    │   │   └── format.ts            # Date, distance, duration formatters
    │   │
    │   ├── App.vue                  # Root component
    │   ├── main.ts                  # Application entry point
    │   └── style.css                # Global styles (TailwindCSS)
    │
    ├── 📄 index.html                 # HTML entry point
    ├── 📄 package.json               # Dependencies
    ├── 📄 vite.config.ts             # Vite configuration
    ├── 📄 tsconfig.json              # TypeScript config
    ├── 📄 tsconfig.node.json         # Node TypeScript config
    ├── 📄 tailwind.config.js         # TailwindCSS config
    ├── 📄 postcss.config.js          # PostCSS config
    ├── 📄 .env.example               # Environment template
    ├── 📄 nginx.conf                 # Nginx config (production)
    └── 📄 Dockerfile                 # Frontend container

```

---

## 📊 Key Files Explained

### Backend Core Files

| File | Purpose |
|------|---------|
| `main.ts` | Bootstraps NestJS app, configures Swagger |
| `app.module.ts` | Root module importing all feature modules |
| `prisma/schema.prisma` | Database schema (tables, relations, enums) |
| `auth/auth.service.ts` | Registration, login, JWT generation |
| `training/training.service.ts` | Training CRUD + plan generation algorithm |
| `motivation/motivation.service.ts` | **CORE**: 40 messages, 4 triggers, milestone logic |

### Frontend Core Files

| File | Purpose |
|------|---------|
| `main.ts` | Bootstraps Vue app with Pinia and Router |
| `router/index.ts` | Route definitions and auth guards |
| `api/client.ts` | Axios config with JWT interceptors |
| `stores/auth.ts` | Authentication state management |
| `views/DashboardView.vue` | Main app interface with stats |
| `components/MotivationCard.vue` | Displays motivational messages |

### Configuration Files

| File | Purpose |
|------|---------|
| `docker-compose.yml` | Orchestrates 3 containers (DB, Backend, Frontend) |
| `backend/.env` | Backend environment variables |
| `frontend/.env` | Frontend environment variables |
| `backend/prisma/schema.prisma` | Database structure |

### Documentation Files

| File | Purpose |
|------|---------|
| `README.md` | Project overview and quick intro |
| `QUICKSTART.md` | **START HERE** - 5-minute guide |
| `SETUP.md` | Detailed installation instructions |
| `ARCHITECTURE.md` | System design and patterns |
| `API_ENDPOINTS.md` | Complete API reference |
| `PROJECT_SUMMARY.md` | Feature list and tech stack |

---

## 🎯 Where to Start Reading

### For Developers (First Time)
1. **README.md** - Understand what ONPER is
2. **QUICKSTART.md** - Get it running in 5 minutes
3. **ARCHITECTURE.md** - Understand the system design
4. **backend/src/motivation/motivation.service.ts** - See the core feature

### For API Integration
1. **API_ENDPOINTS.md** - All endpoints with examples
2. **backend/src/*/\*.controller.ts** - Controller implementations
3. **http://localhost:3000/api** - Interactive Swagger docs

### For Frontend Development
1. **frontend/src/router/index.ts** - Understand routes
2. **frontend/src/stores/** - State management
3. **frontend/src/views/** - Page implementations

---

## 🔍 Find Specific Features

### Authentication Flow
```
backend/src/auth/auth.service.ts        # Backend logic
frontend/src/stores/auth.ts             # Frontend state
frontend/src/views/LoginView.vue        # Login UI
frontend/src/views/RegisterView.vue     # Register UI
```

### Training Sessions
```
backend/src/training/training.service.ts    # Backend CRUD + plan gen
frontend/src/stores/training.ts             # Frontend state
frontend/src/views/DashboardView.vue        # Training list
frontend/src/views/TrainingDetailView.vue   # Single workout
```

### Motivation System 🌟
```
backend/src/motivation/motivation.service.ts  # 40 messages, triggers
frontend/src/stores/motivation.ts             # Frontend state
frontend/src/components/MotivationCard.vue    # Message display
frontend/src/views/MotivationView.vue         # Feed page
```

### Database
```
backend/prisma/schema.prisma    # Schema definition
backend/prisma/seed.ts          # Sample data
```

---

## 📦 Module Dependencies

### Backend Module Flow
```
AppModule
├── AuthModule → UserModule
├── UserModule → PrismaModule
├── TrainingModule → MotivationModule → PrismaModule
├── MotivationModule → PrismaModule
└── NotificationModule → MotivationModule
```

### Frontend Store Dependencies
```
AuthStore (independent)
TrainingStore → calls training API
MotivationStore → calls motivation API
```

---

## 🛠️ Configuration Files Location

### Environment Variables
- Backend: `backend/.env` (copy from `.env.example`)
- Frontend: `frontend/.env` (copy from `.env.example`)

### Docker
- Main: `docker-compose.yml`
- Backend: `backend/Dockerfile`
- Frontend: `frontend/Dockerfile`
- Nginx: `frontend/nginx.conf`

### TypeScript
- Backend: `backend/tsconfig.json`
- Frontend: `frontend/tsconfig.json`, `frontend/tsconfig.node.json`

### Code Quality
- ESLint: `backend/.eslintrc.js`
- Prettier: `backend/.prettierrc`

---

## 🎨 UI Components Hierarchy

```
App.vue
└── router-view (changes based on route)
    ├── LandingView.vue (/)
    ├── LoginView.vue (/login)
    ├── RegisterView.vue (/register)
    ├── SetupView.vue (/setup)
    │
    └── Protected Routes (with Navbar)
        ├── DashboardView.vue (/dashboard)
        │   ├── Navbar
        │   ├── MotivationCard (latest)
        │   ├── StatCard × 4
        │   └── Training list
        │
        ├── TrainingDetailView.vue (/training/:id)
        │   ├── Navbar
        │   └── Training details
        │
        └── MotivationView.vue (/motivation)
            ├── Navbar
            ├── Stats × 3
            └── MotivationCard × N
```

---

## 📊 Database Tables

```
PostgreSQL Database: onper

Tables:
├── users
│   ├── id (UUID, PK)
│   ├── email (unique)
│   ├── password_hash
│   ├── name
│   ├── goal (enum)
│   └── level (enum)
│
├── trainings
│   ├── id (UUID, PK)
│   ├── user_id (FK → users)
│   ├── date
│   ├── distance
│   ├── duration
│   ├── mood (enum)
│   └── completed
│
└── motivation_logs
    ├── id (UUID, PK)
    ├── user_id (FK → users)
    ├── trigger (enum)
    └── message
```

---

## 🚀 Startup Order

When you run `docker-compose up`:

1. **PostgreSQL** starts (port 5432)
2. **Backend** starts
   - Connects to PostgreSQL
   - Runs Prisma migrations
   - Starts NestJS server (port 3000)
3. **Frontend** starts
   - Builds Vue app
   - Starts Nginx server (port 5173)
   - Proxies API calls to backend

---

## 💡 Quick Reference

### Add New API Endpoint
1. Create DTO in `backend/src/[module]/dto/`
2. Add method in `[module].service.ts`
3. Add route in `[module].controller.ts`
4. Add API call in `frontend/src/api/[module].ts`

### Add New Page
1. Create `frontend/src/views/YourView.vue`
2. Add route in `frontend/src/router/index.ts`
3. Add navigation link in `Navbar.vue`

### Add Database Field
1. Update `backend/prisma/schema.prisma`
2. Run `npx prisma migrate dev`
3. Update DTOs and interfaces
4. Update UI forms

---

**Navigation Tip**: Use your IDE's file search (Ctrl+P / Cmd+P) to quickly jump to any file!

