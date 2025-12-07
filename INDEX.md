# 📚 ONPER - Documentation Index

Welcome to ONPER! This index helps you navigate all the documentation.

---

## 🚀 Getting Started (Read First)

Start here if you're new to the project:

1. **[README.md](README.md)** - Project overview and introduction
2. **[QUICKSTART.md](QUICKSTART.md)** ⭐ - Get running in 5 minutes
3. **[SETUP.md](SETUP.md)** - Detailed installation guide

**Quick Start Command:**
```bash
docker-compose up --build
```

---

## 📖 Main Documentation

### Core Documentation
- **[PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)** - Complete feature list and MVP scope
- **[ARCHITECTURE.md](ARCHITECTURE.md)** - System design and architecture patterns
- **[API_ENDPOINTS.md](API_ENDPOINTS.md)** - Complete API reference with examples
- **[SYSTEM_DIAGRAM.md](SYSTEM_DIAGRAM.md)** - Visual diagrams and flows

### Reference Guides
- **[FILE_STRUCTURE.md](FILE_STRUCTURE.md)** - Complete project file structure
- **[COMMANDS.md](COMMANDS.md)** - All commands you need (Docker, npm, etc.)
- **[DATABASE_SETUP.md](DATABASE_SETUP.md)** - Database setup, seeding, and troubleshooting
- **[INDEX.md](INDEX.md)** - This file

---

## 🎯 Documentation by Role

### For Product Managers
1. [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md) - What features are implemented
2. [QUICKSTART.md](QUICKSTART.md) - See it running quickly
3. [README.md](README.md) - High-level overview

### For Developers (New to Project)
1. [QUICKSTART.md](QUICKSTART.md) - Get it running
2. [ARCHITECTURE.md](ARCHITECTURE.md) - Understand the system
3. [FILE_STRUCTURE.md](FILE_STRUCTURE.md) - Navigate the codebase
4. [COMMANDS.md](COMMANDS.md) - Development commands

### For Backend Developers
1. [ARCHITECTURE.md](ARCHITECTURE.md) - Backend architecture
2. [API_ENDPOINTS.md](API_ENDPOINTS.md) - All endpoints
3. [FILE_STRUCTURE.md](FILE_STRUCTURE.md) - Backend file structure
4. `backend/prisma/schema.prisma` - Database schema
5. `backend/src/motivation/motivation.service.ts` - Core feature

### For Frontend Developers
1. [ARCHITECTURE.md](ARCHITECTURE.md) - Frontend architecture
2. [API_ENDPOINTS.md](API_ENDPOINTS.md) - API integration
3. [FILE_STRUCTURE.md](FILE_STRUCTURE.md) - Frontend file structure
4. `frontend/src/router/index.ts` - Routes
5. `frontend/src/stores/` - State management

### For DevOps Engineers
1. [SETUP.md](SETUP.md) - Deployment setup
2. [COMMANDS.md](COMMANDS.md) - Docker commands
3. `docker-compose.yml` - Container orchestration
4. `backend/Dockerfile` - Backend container
5. `frontend/Dockerfile` - Frontend container

---

## 🔍 Find What You Need

### By Topic

#### Authentication
- **Setup**: [SETUP.md](SETUP.md) → Backend Setup → JWT Configuration
- **Architecture**: [ARCHITECTURE.md](ARCHITECTURE.md) → Auth Module
- **API**: [API_ENDPOINTS.md](API_ENDPOINTS.md) → Authentication
- **Code**: `backend/src/auth/` → All auth files

#### Training Sessions
- **Features**: [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md) → Training Management
- **Architecture**: [ARCHITECTURE.md](ARCHITECTURE.md) → Training Module
- **API**: [API_ENDPOINTS.md](API_ENDPOINTS.md) → Training Sessions
- **Code**: `backend/src/training/` and `frontend/src/stores/training.ts`

#### Motivation System (Core Feature)
- **Overview**: [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md) → Motivation System
- **Architecture**: [ARCHITECTURE.md](ARCHITECTURE.md) → Motivation Module
- **Flow**: [SYSTEM_DIAGRAM.md](SYSTEM_DIAGRAM.md) → Motivation Architecture
- **Code**: `backend/src/motivation/motivation.service.ts`
- **Messages**: View 40 messages in the service file

#### Database
- **Schema**: `backend/prisma/schema.prisma`
- **Setup**: [SETUP.md](SETUP.md) → Database Management
- **Commands**: [COMMANDS.md](COMMANDS.md) → Database Commands
- **Diagram**: [SYSTEM_DIAGRAM.md](SYSTEM_DIAGRAM.md) → Database Tables

#### Docker & Deployment
- **Quick Start**: [QUICKSTART.md](QUICKSTART.md)
- **Setup**: [SETUP.md](SETUP.md) → Quick Start with Docker
- **Commands**: [COMMANDS.md](COMMANDS.md) → Docker Commands
- **Config**: `docker-compose.yml`

---

## 📊 Visual Documentation

### Diagrams
All diagrams are in [SYSTEM_DIAGRAM.md](SYSTEM_DIAGRAM.md):
- Complete System Overview
- User Registration Flow
- Complete Workout Flow
- Module Interaction Diagram
- Authentication Flow
- Motivation System Architecture
- Training Plan Generation Flow
- Docker Compose Architecture
- Technology Stack Layers

---

## 🛠️ Quick References

### Common Tasks

| Task | Where to Look |
|------|---------------|
| Start the app | [QUICKSTART.md](QUICKSTART.md) |
| Install locally | [SETUP.md](SETUP.md) → Local Development |
| View all commands | [COMMANDS.md](COMMANDS.md) |
| Understand architecture | [ARCHITECTURE.md](ARCHITECTURE.md) |
| Test API | [API_ENDPOINTS.md](API_ENDPOINTS.md) |
| Navigate files | [FILE_STRUCTURE.md](FILE_STRUCTURE.md) |
| See system flow | [SYSTEM_DIAGRAM.md](SYSTEM_DIAGRAM.md) |

### Troubleshooting

| Issue | Solution |
|-------|----------|
| Can't start services | [COMMANDS.md](COMMANDS.md) → Troubleshooting |
| Port conflicts | [SETUP.md](SETUP.md) → Troubleshooting |
| Database issues | [COMMANDS.md](COMMANDS.md) → Reset Database |
| API not responding | [API_ENDPOINTS.md](API_ENDPOINTS.md) → Check endpoints |

---

## 🎓 Learning Path

### Day 1: Get it Running
1. Read [README.md](README.md) (5 min)
2. Follow [QUICKSTART.md](QUICKSTART.md) (10 min)
3. Explore the running app (20 min)
4. Browse [API_ENDPOINTS.md](API_ENDPOINTS.md) (10 min)

### Day 2: Understand the System
1. Read [ARCHITECTURE.md](ARCHITECTURE.md) (30 min)
2. Study [SYSTEM_DIAGRAM.md](SYSTEM_DIAGRAM.md) (20 min)
3. Review [FILE_STRUCTURE.md](FILE_STRUCTURE.md) (20 min)
4. Examine motivation system code (30 min)

### Day 3: Start Developing
1. Setup local environment: [SETUP.md](SETUP.md) (30 min)
2. Learn commands: [COMMANDS.md](COMMANDS.md) (20 min)
3. Make your first change (1-2 hours)
4. Test with API: [API_ENDPOINTS.md](API_ENDPOINTS.md) (20 min)

---

## 📦 Code Structure Quick Links

### Backend
```
backend/src/
├── auth/          → Authentication (JWT, Guards)
├── user/          → User profile management
├── training/      → Training sessions + plan generation
├── motivation/    → 🌟 CORE: 40 messages, 4 triggers
├── notification/  → Reminders and notifications
└── prisma/        → Database access layer
```

### Frontend
```
frontend/src/
├── api/           → API client (Axios)
├── components/    → Reusable Vue components
├── views/         → Page components (8 pages)
├── stores/        → Pinia state management
├── router/        → Vue Router configuration
├── types/         → TypeScript definitions
└── utils/         → Helper functions
```

---

## 🌟 Key Features Documentation

### 1. User Authentication
- **Docs**: [ARCHITECTURE.md](ARCHITECTURE.md) → Auth Module
- **API**: [API_ENDPOINTS.md](API_ENDPOINTS.md) → Authentication
- **Diagram**: [SYSTEM_DIAGRAM.md](SYSTEM_DIAGRAM.md) → Authentication Flow

### 2. Training Management
- **Docs**: [ARCHITECTURE.md](ARCHITECTURE.md) → Training Module
- **API**: [API_ENDPOINTS.md](API_ENDPOINTS.md) → Training Sessions
- **Diagram**: [SYSTEM_DIAGRAM.md](SYSTEM_DIAGRAM.md) → Complete Workout Flow

### 3. Motivation System (CORE)
- **Docs**: [ARCHITECTURE.md](ARCHITECTURE.md) → Motivation Module
- **API**: [API_ENDPOINTS.md](API_ENDPOINTS.md) → Motivation System
- **Diagram**: [SYSTEM_DIAGRAM.md](SYSTEM_DIAGRAM.md) → Motivation Architecture
- **Code**: `backend/src/motivation/motivation.service.ts`

### 4. Training Plan Generation
- **Docs**: [ARCHITECTURE.md](ARCHITECTURE.md) → Training Plan Logic
- **API**: [API_ENDPOINTS.md](API_ENDPOINTS.md) → Generate Training Plan
- **Diagram**: [SYSTEM_DIAGRAM.md](SYSTEM_DIAGRAM.md) → Plan Generation Flow

---

## 🔗 External Resources

### Interactive Documentation
- **API Docs**: http://localhost:3000/api (when running)
- **Prisma Studio**: http://localhost:5555 (when running)
- **Frontend**: http://localhost:5173 (when running)

### Technology Documentation
- [NestJS Docs](https://docs.nestjs.com)
- [Vue 3 Docs](https://vuejs.org)
- [Prisma Docs](https://www.prisma.io/docs)
- [TailwindCSS Docs](https://tailwindcss.com)
- [Docker Docs](https://docs.docker.com)

---

## 📝 Contributing Guide

1. **Before coding**:
   - Read [ARCHITECTURE.md](ARCHITECTURE.md)
   - Understand the module structure
   - Review [COMMANDS.md](COMMANDS.md)

2. **During development**:
   - Follow TypeScript strict mode
   - Use ESLint and Prettier
   - Test API with Swagger
   - Check diagrams in [SYSTEM_DIAGRAM.md](SYSTEM_DIAGRAM.md)

3. **Before committing**:
   - Run tests
   - Update documentation if needed
   - Follow commit message conventions

---

## 🎯 Feature Implementation Checklist

### Adding New Feature

#### Backend
- [ ] Create/update Prisma schema
- [ ] Run migration: `npx prisma migrate dev`
- [ ] Create DTO in `dto/` folder
- [ ] Add service method
- [ ] Add controller endpoint
- [ ] Update Swagger documentation
- [ ] Write tests

#### Frontend
- [ ] Create API method in `src/api/`
- [ ] Add Pinia store action if needed
- [ ] Create/update Vue component
- [ ] Add route if new page
- [ ] Update TypeScript types
- [ ] Test in browser

#### Documentation
- [ ] Update [API_ENDPOINTS.md](API_ENDPOINTS.md)
- [ ] Update [ARCHITECTURE.md](ARCHITECTURE.md) if major
- [ ] Update [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)

---

## 🏆 Project Achievements

✅ **Complete MVP** - All features implemented  
✅ **Motivation System** - 40 messages, 4 trigger types  
✅ **Docker Ready** - One-command deployment  
✅ **Full TypeScript** - Type-safe end-to-end  
✅ **API Documentation** - Swagger UI included  
✅ **Comprehensive Docs** - 8 documentation files  
✅ **Clean Architecture** - SOLID principles  
✅ **Production Ready** - Deployable today  

---

## 🆘 Getting Help

### Can't find what you're looking for?

1. **Search this file** (Ctrl+F) for keywords
2. **Check [COMMANDS.md](COMMANDS.md)** for command syntax
3. **Review [FILE_STRUCTURE.md](FILE_STRUCTURE.md)** to locate files
4. **See [SYSTEM_DIAGRAM.md](SYSTEM_DIAGRAM.md)** for visual understanding

### Common Questions

**Q: How do I start the app?**  
A: See [QUICKSTART.md](QUICKSTART.md)

**Q: Where is the motivation system code?**  
A: `backend/src/motivation/motivation.service.ts`

**Q: How do I add a new API endpoint?**  
A: See [ARCHITECTURE.md](ARCHITECTURE.md) → Adding New Features

**Q: Where are the 40 motivational messages?**  
A: `backend/src/motivation/motivation.service.ts` → `messages` object

**Q: How do I test the API?**  
A: See [API_ENDPOINTS.md](API_ENDPOINTS.md) or visit http://localhost:3000/api

---

## 📌 Bookmark These

**Most Important:**
- [QUICKSTART.md](QUICKSTART.md) - Start here
- [ARCHITECTURE.md](ARCHITECTURE.md) - Understand the system
- [COMMANDS.md](COMMANDS.md) - Command reference

**Daily Use:**
- [API_ENDPOINTS.md](API_ENDPOINTS.md) - API reference
- [FILE_STRUCTURE.md](FILE_STRUCTURE.md) - Navigate code
- http://localhost:3000/api - Live API docs

---

## 🎉 You're Ready!

Choose your path:
- **Just want to see it running?** → [QUICKSTART.md](QUICKSTART.md)
- **Want to understand it?** → [ARCHITECTURE.md](ARCHITECTURE.md)
- **Want to develop?** → [SETUP.md](SETUP.md) + [COMMANDS.md](COMMANDS.md)
- **Want to integrate?** → [API_ENDPOINTS.md](API_ENDPOINTS.md)

---

**ONPER - One Percent Runner 🏃**  
*Join the 1% who complete a marathon*

---

**Documentation Version**: 1.0  
**Last Updated**: December 2024  
**Status**: MVP Complete ✅

