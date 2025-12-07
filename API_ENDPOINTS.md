# ONPER API Endpoints Documentation

Base URL: `http://localhost:3000`

---

## 🔐 Authentication

### Register User
```http
POST /auth/register
Content-Type: application/json

{
  "email": "john@example.com",
  "name": "John Doe",
  "password": "password123",
  "goal": "FULL",      // optional: FIVE_K, TEN_K, HALF, FULL
  "level": "BEGINNER"  // optional: BEGINNER, INTERMEDIATE, ADVANCED
}

Response 201:
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "uuid",
    "email": "john@example.com",
    "name": "John Doe",
    "goal": "FULL",
    "level": "BEGINNER"
  }
}
```

### Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}

Response 200:
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "uuid",
    "email": "john@example.com",
    "name": "John Doe",
    "goal": "FULL",
    "level": "BEGINNER"
  }
}
```

---

## 👤 User Management

### Get User Profile
```http
GET /users/profile
Authorization: Bearer {token}

Response 200:
{
  "id": "uuid",
  "email": "john@example.com",
  "name": "John Doe",
  "goal": "FULL",
  "level": "BEGINNER",
  "createdAt": "2024-01-15T10:00:00Z",
  "stats": {
    "totalRuns": 25,
    "totalDistance": 150.5,
    "totalDuration": 900,
    "averageDistance": 6.0
  }
}
```

### Update User Profile
```http
PATCH /users/profile
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "John Updated",
  "goal": "HALF",
  "level": "INTERMEDIATE"
}

Response 200:
{
  "id": "uuid",
  "email": "john@example.com",
  "name": "John Updated",
  "goal": "HALF",
  "level": "INTERMEDIATE",
  "createdAt": "2024-01-15T10:00:00Z"
}
```

---

## 🏃 Training Sessions

### Create Training Session
```http
POST /training
Authorization: Bearer {token}
Content-Type: application/json

{
  "date": "2024-01-20",
  "distance": 5.0,
  "duration": 30,
  "mood": "NORMAL",      // TIRED, NORMAL, ENERGIZED
  "completed": true,
  "notes": "Great run!"  // optional
}

Response 201:
{
  "id": "uuid",
  "userId": "uuid",
  "date": "2024-01-20T00:00:00Z",
  "distance": 5.0,
  "duration": 30,
  "mood": "NORMAL",
  "completed": true,
  "notes": "Great run!",
  "createdAt": "2024-01-20T10:00:00Z",
  "updatedAt": "2024-01-20T10:00:00Z"
}
```

### Get All Training Sessions
```http
GET /training?limit=10
Authorization: Bearer {token}

Response 200:
[
  {
    "id": "uuid",
    "userId": "uuid",
    "date": "2024-01-20T00:00:00Z",
    "distance": 5.0,
    "duration": 30,
    "mood": "NORMAL",
    "completed": true,
    "notes": "Great run!",
    "createdAt": "2024-01-20T10:00:00Z",
    "updatedAt": "2024-01-20T10:00:00Z"
  }
]
```

### Get Single Training Session
```http
GET /training/{id}
Authorization: Bearer {token}

Response 200:
{
  "id": "uuid",
  "userId": "uuid",
  "date": "2024-01-20T00:00:00Z",
  "distance": 5.0,
  "duration": 30,
  "mood": "NORMAL",
  "completed": true,
  "notes": "Great run!",
  "createdAt": "2024-01-20T10:00:00Z",
  "updatedAt": "2024-01-20T10:00:00Z"
}
```

### Update Training Session
```http
PATCH /training/{id}
Authorization: Bearer {token}
Content-Type: application/json

{
  "completed": true,
  "notes": "Updated notes"
}

Response 200:
{
  "id": "uuid",
  "userId": "uuid",
  "date": "2024-01-20T00:00:00Z",
  "distance": 5.0,
  "duration": 30,
  "mood": "NORMAL",
  "completed": true,
  "notes": "Updated notes",
  "createdAt": "2024-01-20T10:00:00Z",
  "updatedAt": "2024-01-20T11:00:00Z"
}
```

### Delete Training Session
```http
DELETE /training/{id}
Authorization: Bearer {token}

Response 200:
{
  "message": "Training session deleted successfully"
}
```

### Generate Training Plan
```http
GET /training/plan?goal=FULL&level=BEGINNER
Authorization: Bearer {token}

Response 200:
{
  "goal": "FULL",
  "level": "BEGINNER",
  "duration": 20,
  "plan": [
    {
      "week": 1,
      "runs": [
        {
          "day": 1,
          "distance": 4.8,
          "type": "Easy Run"
        },
        {
          "day": 2,
          "distance": 6.4,
          "type": "Tempo Run"
        },
        {
          "day": 3,
          "distance": 9.6,
          "type": "Long Run"
        }
      ]
    }
  ]
}
```

---

## 💪 Motivation System

### Get Motivation History
```http
GET /motivation/history?limit=20
Authorization: Bearer {token}

Response 200:
[
  {
    "id": "uuid",
    "userId": "uuid",
    "trigger": "COMPLETED",
    "message": "Yesterday you were ahead of 99% of people — today just beat yourself.",
    "createdAt": "2024-01-20T10:00:00Z"
  }
]
```

### Get Latest Motivation
```http
GET /motivation/latest
Authorization: Bearer {token}

Response 200:
{
  "id": "uuid",
  "userId": "uuid",
  "trigger": "COMPLETED",
  "message": "Yesterday you were ahead of 99% of people — today just beat yourself.",
  "createdAt": "2024-01-20T10:00:00Z"
}
```

### Check Milestones
```http
POST /motivation/check-milestones
Authorization: Bearer {token}

Response 200:
{
  "id": "uuid",
  "userId": "uuid",
  "trigger": "MILESTONE",
  "message": "You've completed 10 runs! You're in the top 10% of people who start.",
  "createdAt": "2024-01-20T10:00:00Z",
  "type": "milestone"
}
```

### Send Daily Reminder
```http
POST /motivation/daily-reminder
Authorization: Bearer {token}

Response 200:
{
  "id": "uuid",
  "userId": "uuid",
  "trigger": "REMINDER",
  "message": "Your running shoes are waiting. Your future self will thank you.",
  "createdAt": "2024-01-20T10:00:00Z",
  "type": "reminder"
}
```

---

## 🔔 Notifications

### Get Notification Preferences
```http
GET /notifications/preferences
Authorization: Bearer {token}

Response 200:
{
  "userId": "uuid",
  "enabled": true,
  "types": ["REMINDER", "MOTIVATION", "MILESTONE"],
  "quietHours": {
    "start": "22:00",
    "end": "07:00"
  },
  "frequency": "daily",
  "note": "Preferences feature ready for future implementation"
}
```

### Check for Missed Workouts
```http
POST /notifications/check-missed
Authorization: Bearer {token}

Response 200:
{
  "userId": "uuid",
  "type": "REMINDER",
  "message": "A single step forward is still progress. Let's start again.",
  "sentAt": "2024-01-20T10:00:00Z",
  "status": "sent",
  "note": "In MVP mode - would use FCM/APNs in production"
}
```

### Send Daily Reminder
```http
POST /notifications/daily-reminder
Authorization: Bearer {token}

Response 200:
{
  "userId": "uuid",
  "type": "REMINDER",
  "message": "Your running shoes are waiting. Your future self will thank you.",
  "sentAt": "2024-01-20T10:00:00Z",
  "status": "sent",
  "note": "In MVP mode - would use FCM/APNs in production"
}
```

---

## 📊 Response Status Codes

| Code | Meaning |
|------|---------|
| 200 | OK - Request successful |
| 201 | Created - Resource created successfully |
| 400 | Bad Request - Invalid input data |
| 401 | Unauthorized - Authentication required or failed |
| 404 | Not Found - Resource doesn't exist |
| 409 | Conflict - Resource already exists |
| 500 | Internal Server Error |

---

## 🔑 Authentication

All protected endpoints require a JWT token in the Authorization header:

```http
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

Tokens are obtained from `/auth/register` or `/auth/login` endpoints and are valid for 7 days.

---

## 📝 Notes

- All dates are in ISO 8601 format
- Distance is always in kilometers
- Duration is always in minutes
- The API automatically triggers motivation messages when:
  - A training session is marked as completed
  - Milestones are reached
  - Daily reminders are sent

---

## 🧪 Testing with cURL

### Register
```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","name":"Test User","password":"test123"}'
```

### Login
```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123"}'
```

### Create Training (with token)
```bash
curl -X POST http://localhost:3000/training \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"date":"2024-01-20","distance":5.0,"duration":30,"completed":true}'
```

---

## 📚 Full API Documentation

For interactive API documentation, visit:

**http://localhost:3000/api**

This provides Swagger UI where you can:
- View all endpoints
- See request/response schemas
- Test API calls directly
- View authentication requirements

