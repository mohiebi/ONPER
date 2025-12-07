# Database Setup Guide

## Initial Setup

The database has been configured and seeded with demo data.

### Demo Account Credentials

- **Email**: `demo@onper.com`
- **Password**: `demo123`

## Running Migrations and Seeding

If you need to reset or initialize the database, follow these steps:

### 1. Run Database Migrations

```bash
docker exec onper-backend npx prisma migrate dev --name init
```

This creates all the necessary database tables.

### 2. Seed the Database

```bash
docker exec onper-backend npx prisma db seed
```

Or run directly:

```bash
docker exec onper-backend node prisma/seed.js
```

This will create:
- A demo user (demo@onper.com / demo123)
- Sample training sessions
- Sample motivation logs

### 3. Verify the Setup

Check if the demo user was created:

```bash
docker exec onper-db psql -U postgres -d onper -c "SELECT email, name FROM users;"
```

## Testing the API

### Test Login

```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"demo@onper.com","password":"demo123"}'
```

### Test Registration

```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"newuser@example.com","name":"New User","password":"password123","goal":"FULL","level":"BEGINNER"}'
```

## Troubleshooting

### If migrations haven't been run

Run the migration command to create tables:
```bash
docker exec onper-backend npx prisma migrate dev --name init
```

### If seeding fails

Check the backend logs:
```bash
docker logs onper-backend
```

Run the seed script directly:
```bash
docker exec onper-backend node prisma/seed.js
```

### Reset Everything

To completely reset the database:

```bash
# Stop containers
docker compose down

# Remove volumes (this deletes all data)
docker volume rm onper_postgres-data

# Start fresh
docker compose up -d

# Run migrations
docker exec onper-backend npx prisma migrate dev --name init

# Seed database
docker exec onper-backend node prisma/seed.js
```

## Database Access

### Using Prisma Studio

```bash
docker exec onper-backend npx prisma studio
```

Then open http://localhost:5555 in your browser.

### Using psql directly

```bash
docker exec -it onper-db psql -U postgres -d onper
```

Common queries:
```sql
-- List all users
SELECT * FROM users;

-- List all trainings
SELECT * FROM trainings;

-- List all motivation logs
SELECT * FROM motivation_logs;
```

