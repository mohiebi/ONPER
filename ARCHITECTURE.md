# ONPER Architecture Documentation

## 🏗️ System Overview

ONPER is a full-stack web application built with modern technologies following clean architecture principles.

```
┌─────────────────────────────────────────────────────────┐
│                     Frontend (Vue 3)                     │
│  ┌──────────┐  ┌──────────┐  ┌────────────┐            │
│  │  Views   │  │  Stores  │  │ Components │            │
│  └────┬─────┘  └────┬─────┘  └──────┬─────┘            │
│       │             │                │                  │
│       └─────────────┴────────────────┘                  │
│                     │                                    │
│              ┌──────▼──────┐                            │
│              │  API Client │                            │
│              └──────┬──────┘                            │
└───────────────────────┼────────────────────────────────┘
                        │ HTTP/REST
                        │
┌───────────────────────▼────────────────────────────────┐
│                   Backend (NestJS)                      │
│  ┌────────────┐  ┌────────────┐  ┌──────────────┐     │
│  │Controllers │  │  Services  │  │ Repositories │     │
│  └─────┬──────┘  └─────┬──────┘  └──────┬───────┘     │
│        │                │                 │             │
│        └────────────────┴─────────────────┘             │
│                         │                               │
│                  ┌──────▼──────┐                        │
│                  │   Prisma    │                        │
│                  └──────┬──────┘                        │
└─────────────────────────┼────────────────────────────┘
                          │
                   ┌──────▼──────┐
                   │  PostgreSQL │
                   └─────────────┘
```

---

## 🎯 Backend Architecture

### Tech Stack

- **Framework**: NestJS (TypeScript)
- **ORM**: Prisma
- **Database**: PostgreSQL
- **Authentication**: JWT (Passport)
- **Documentation**: Swagger/OpenAPI

### Module Structure

#### 1. Auth Module
**Purpose**: User authentication and authorization

**Components**:
- `AuthController`: Handles `/auth/register` and `/auth/login`
- `AuthService`: Business logic for registration, login, token generation
- `JwtStrategy`: Validates JWT tokens
- `JwtAuthGuard`: Protects authenticated routes

**Flow**:
```
Client → AuthController → AuthService → UserService → Prisma → Database
                                    ↓
                                 JwtService (generate token)
```

#### 2. User Module
**Purpose**: User profile management

**Components**:
- `UserController`: `/users/profile` endpoints
- `UserService`: CRUD operations for users
- Repository pattern with Prisma

**Features**:
- Get user profile with statistics
- Update profile (goal, level, name)

#### 3. Training Module
**Purpose**: Workout tracking and plan generation

**Components**:
- `TrainingController`: `/training/*` endpoints
- `TrainingService`: Training session management
- Integration with MotivationService

**Features**:
- Create/Read/Update/Delete training sessions
- Generate rule-based training plans (8-20 weeks)
- Automatically trigger motivation on completion

**Training Plan Logic**:
```typescript
Goal × Level → Plan Duration + Weekly Schedule
- 5K Beginner: 8 weeks, 3 runs/week
- Full Marathon Advanced: 16 weeks, 5 runs/week
```

#### 4. Motivation Module (Core Feature)
**Purpose**: Deliver motivational messages based on user actions

**Components**:
- `MotivationController`: `/motivation/*` endpoints
- `MotivationService`: Message selection and logging

**Trigger Types**:
- `COMPLETED`: After finishing a workout
- `MISSED`: When workout is not completed
- `MILESTONE`: Reaching run count or distance goals
- `REMINDER`: Daily training reminders

**Message Bank**:
- 10 messages per trigger type
- Randomly selected (ready for AI upgrade)
- Stored in database as logs

**Flow**:
```
Training Completed → TrainingService → MotivationService
                                             ↓
                                   Select Message (Random)
                                             ↓
                                   Create MotivationLog
                                             ↓
                                   Return to Frontend
```

#### 5. Notification Module
**Purpose**: Schedule and send notifications (MVP: simulated)

**Components**:
- `NotificationController`: `/notifications/*` endpoints
- `NotificationService`: Notification logic

**Features**:
- Check for missed workouts
- Send daily reminders
- Placeholder for push notifications (FCM/APNs)

### Database Schema

```prisma
User
├── id (UUID)
├── email (unique)
├── passwordHash
├── name
├── goal (ENUM: 5k, 10k, half, full)
├── level (ENUM: beginner, intermediate, advanced)
└── timestamps

Training
├── id (UUID)
├── userId (FK → User)
├── date
├── distance (km)
├── duration (minutes)
├── mood (ENUM: tired, normal, energized)
├── completed (boolean)
├── notes (optional)
└── timestamps

MotivationLog
├── id (UUID)
├── userId (FK → User)
├── trigger (ENUM: completed, missed, milestone, reminder)
├── message
└── createdAt
```

### API Authentication

- JWT tokens with 7-day expiration
- Bearer token authentication
- Tokens stored in localStorage (client)
- Protected routes use `@UseGuards(JwtAuthGuard)`

### Error Handling

- Global exception filters
- Validation pipes for DTOs
- HTTP status codes:
  - 200: Success
  - 201: Created
  - 400: Bad Request
  - 401: Unauthorized
  - 404: Not Found
  - 409: Conflict
  - 500: Server Error

---

## 🎨 Frontend Architecture

### Tech Stack

- **Framework**: Vue 3 (Composition API)
- **Build Tool**: Vite
- **Styling**: TailwindCSS
- **State Management**: Pinia
- **Router**: Vue Router
- **HTTP Client**: Axios
- **Date Utils**: date-fns

### State Management (Pinia Stores)

#### AuthStore
- Manages authentication state
- Stores user data and JWT token
- Handles login/register/logout
- Persists to localStorage

#### TrainingStore
- Manages training sessions
- CRUD operations
- Training plan generation
- Caches current training

#### MotivationStore
- Manages motivation history
- Fetches latest messages
- Milestone checking

### Routing

**Public Routes**:
- `/` - Landing page
- `/login` - Login
- `/register` - Registration

**Protected Routes** (requires auth):
- `/setup` - Goal and level setup
- `/dashboard` - Main dashboard
- `/training/:id` - Training details
- `/motivation` - Motivation feed

**Navigation Guards**:
```typescript
requiresAuth → redirect to /login if not authenticated
requiresGuest → redirect to /dashboard if authenticated
```

### Component Structure

**Layout Components**:
- `Navbar.vue` - Top navigation with user menu

**Reusable Components**:
- `StatCard.vue` - Displays statistics
- `MotivationCard.vue` - Shows motivation messages
- `LoadingSpinner.vue` - Loading indicator

**Views** (Pages):
- `LandingView.vue` - Marketing page
- `LoginView.vue` - Login form
- `RegisterView.vue` - Registration form
- `SetupView.vue` - Goal/level wizard
- `DashboardView.vue` - Main app interface
- `TrainingDetailView.vue` - Single workout view
- `MotivationView.vue` - Motivation history

### API Integration

**Client Configuration**:
```typescript
axios.create({
  baseURL: env.VITE_API_URL,
  headers: { 'Content-Type': 'application/json' }
})

// Request interceptor: Add JWT token
// Response interceptor: Handle 401 errors
```

**API Modules**:
- `auth.ts` - Authentication calls
- `user.ts` - User profile
- `training.ts` - Training sessions
- `motivation.ts` - Motivation messages

---

## 🔄 Key Workflows

### 1. User Registration & Onboarding

```
Register Form → POST /auth/register → Create User
                                           ↓
                                      JWT Token
                                           ↓
                                    Store in localStorage
                                           ↓
                                    Redirect to /setup
                                           ↓
                              Select Goal & Level
                                           ↓
                                PATCH /users/profile
                                           ↓
                                 Redirect to /dashboard
```

### 2. Complete a Workout

```
Dashboard → "Add Workout" Modal → Fill Form
                                       ↓
                              POST /training (completed: true)
                                       ↓
                              TrainingService.create()
                                       ↓
                          MotivationService.triggerMotivation('COMPLETED')
                                       ↓
                              Select motivational message
                                       ↓
                              Create MotivationLog
                                       ↓
                              Return to frontend
                                       ↓
                              Show motivation card
                                       ↓
                              Update stats
```

### 3. Generate Training Plan

```
Dashboard → "Generate Plan" → GET /training/plan?goal=FULL&level=BEGINNER
                                       ↓
                              TrainingService.generatePlan()
                                       ↓
                         Calculate weeks based on goal + level
                                       ↓
                         Generate weekly schedule (runs per week)
                                       ↓
                         Return plan structure
                                       ↓
                         Display in modal/alert
```

---

## 🚀 Deployment Architecture

### Docker Compose Setup

```yaml
Services:
├── postgres (PostgreSQL 15)
│   └── Port 5432
├── backend (NestJS)
│   ├── Port 3000
│   └── Depends on postgres
└── frontend (Vue 3 + Nginx)
    ├── Port 5173
    └── Proxies /api to backend
```

### Environment Configuration

**Development**:
- Hot reload enabled
- Source maps
- Debug logging
- Prisma Studio access

**Production**:
- Compiled builds
- Minified assets
- Production database
- Environment secrets

---

## 🔐 Security Considerations

### Authentication
- Passwords hashed with bcrypt (salt rounds: 10)
- JWT secrets from environment variables
- Token expiration: 7 days
- CORS enabled for frontend origin

### Input Validation
- DTOs with class-validator
- Type checking with TypeScript
- SQL injection prevention (Prisma)

### Best Practices
- No sensitive data in logs
- Environment variables for secrets
- HTTPS in production
- Rate limiting (future)

---

## 📈 Scalability & Future Enhancements

### Current Limitations (MVP)
- Single server deployment
- In-memory session state
- Basic training plan algorithm
- Static motivational messages

### Recommended Upgrades

1. **AI-Powered Motivation**
   - Integrate OpenAI API
   - Personalize messages based on user history
   - Analyze mood patterns

2. **Real-time Features**
   - WebSocket for live updates
   - Push notifications (FCM/APNs)
   - Real-time progress tracking

3. **Advanced Training Plans**
   - ML-based plan generation
   - Adaptive difficulty
   - Weather-based scheduling

4. **Social Features**
   - User communities
   - Challenges and leaderboards
   - Share achievements

5. **Mobile App**
   - React Native or Flutter
   - GPS tracking
   - Offline mode

6. **Analytics**
   - User behavior tracking
   - Performance metrics
   - A/B testing

---

## 🧪 Testing Strategy

### Backend
- Unit tests for services
- Integration tests for controllers
- E2E tests for critical flows
- Database mocking with Prisma

### Frontend
- Component tests (Vitest)
- Store tests (Pinia)
- E2E tests (Playwright/Cypress)

---

## 📝 Code Style & Standards

### Backend (NestJS)
- SOLID principles
- Dependency injection
- Repository pattern
- DTOs for validation
- Swagger documentation

### Frontend (Vue 3)
- Composition API
- TypeScript strict mode
- Tailwind utility classes
- Component-based architecture

---

## 🎓 Learning Resources

- [NestJS Docs](https://docs.nestjs.com)
- [Vue 3 Docs](https://vuejs.org)
- [Prisma Docs](https://www.prisma.io/docs)
- [TailwindCSS Docs](https://tailwindcss.com)

---

This architecture is designed for:
✅ Maintainability
✅ Scalability  
✅ Developer experience
✅ User experience
✅ Future AI integration

