# 🏃 ONPER - Quick Start Guide

Get ONPER running in under 5 minutes!

---

## 🚀 Fastest Way to Run (Docker)

```bash
# 1. Navigate to project
cd ONPER

# 2. Start all services
docker-compose up

# 3. In a new terminal, setup the database (first time only)
docker exec onper-backend npx prisma migrate dev --name init
docker exec onper-backend npx prisma db seed
```

**That's it!** Wait for the services to start, then access:

- 🌐 **Frontend**: http://localhost:8080
- 🔧 **Backend API**: http://localhost:3000
- 📚 **API Docs**: http://localhost:3000/api

---

## 👤 Test the Application

### Option 1: Use Demo Account

After seeding the database:
- **Email**: `demo@onper.com`
- **Password**: `demo123`

Login at http://localhost:8080

### Option 2: Create New Account

1. Go to http://localhost:8080
2. Click "Sign up" or "Start Your Journey"
3. Fill in registration form
4. Set your goal and level
5. Start logging workouts!

---

## 📋 Step-by-Step First Use

### 1. Open the App
```
http://localhost:8080
```

### 2. Register
- Click "Start Your Journey"
- Enter your name, email, password
- Click "Create Account"

### 3. Setup Profile
- Choose your goal (5K, 10K, Half, Full Marathon)
- Select your level (Beginner, Intermediate, Advanced)
- Click "Continue to Dashboard"

### 4. Log Your First Run
- Click "+ Add Workout"
- Enter date, distance (km), duration (minutes)
- Select your mood
- Mark as completed
- Click "Save"

**🎉 You'll receive your first motivational message!**

### 5. Explore Features
- View your stats on the dashboard
- Check the Motivation Feed
- Generate a training plan
- Track your progress

---

## 🛑 Stop the Application

```bash
# Stop services (Ctrl+C in terminal or)
docker-compose down
```

---

## 🔄 Restart the Application

```bash
# Start services again
docker-compose up
```

---

## 🧹 Clean Reset (Fresh Start)

```bash
# Stop and remove all data
docker-compose down -v

# Start fresh
docker-compose up --build
```

---

## 📊 View Database

While services are running:

```bash
# Open new terminal
cd backend
npx prisma studio
```

Opens at: http://localhost:5555

---

## 🐛 Troubleshooting

### Port Already in Use

**Error**: `Port 3000/5173/5432 already in use`

**Solution**: Stop other services or change ports in `docker-compose.yml`

### Services Not Starting

**Error**: Container fails to start

**Solution**:
```bash
# Clean rebuild
docker-compose down -v
docker-compose up --build --force-recreate
```

### Frontend Can't Connect to Backend

**Check**:
1. Backend is running: http://localhost:3000/api
2. Check browser console for errors
3. Verify CORS settings

### Database Issues

**Solution**:
```bash
# Reset database
docker-compose down -v
docker-compose up --build
```

---

## 🧪 Test API with cURL

### Register User
```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "name": "Test User",
    "password": "test123"
  }'
```

### Login
```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "test123"
  }'
```

### Get Profile (use token from login)
```bash
curl http://localhost:3000/users/profile \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## 📱 Access from Mobile

If running on your computer and want to test on phone:

1. Find your computer's local IP (e.g., 192.168.1.100)
2. Update `frontend/.env`:
   ```
   VITE_API_URL=http://192.168.1.100:3000
   ```
3. Restart frontend service
4. Access from phone: `http://192.168.1.100:5173`

---

## 🎯 What to Try

### 1. Complete a Workout
Log a workout and mark it as completed to see a motivational message!

### 2. Check Milestones
Complete 5, 10, or 25 runs to unlock milestone messages

### 3. Generate Training Plan
Click "Training Plan" to see your custom 8-20 week schedule

### 4. View Motivation Feed
See all your motivational messages in one place

### 5. Track Stats
Watch your total distance and runs grow over time

---

## 📚 Learn More

- **Full Setup**: See `SETUP.md`
- **Architecture**: See `ARCHITECTURE.md`
- **API Reference**: See `API_ENDPOINTS.md`
- **Project Details**: See `PROJECT_SUMMARY.md`

---

## 🎉 You're Ready!

Start your journey to become part of the 1% of people who can complete a marathon!

**Questions?** Check the documentation files or the API docs at http://localhost:3000/api

---

**ONPER - One Percent Runner 🏃‍♂️**

*"Yesterday you were ahead of 99% of people — today just beat yourself."*

