# 🚀 ONPER - Production Deployment Checklist

Use this checklist before deploying ONPER to production.

---

## ✅ Pre-Deployment Checklist

### 🔐 Security

- [ ] Change JWT_SECRET to a strong random string (min 32 characters)
- [ ] Use strong database password
- [ ] Enable HTTPS/SSL certificates
- [ ] Configure CORS to allow only production domain
- [ ] Remove default demo account or change password
- [ ] Set secure HTTP headers (Helmet.js)
- [ ] Enable rate limiting
- [ ] Review and restrict API endpoints
- [ ] Set secure cookie flags
- [ ] Disable Prisma Studio in production
- [ ] Remove or restrict Swagger docs access

### 🗄️ Database

- [ ] Database backup strategy in place
- [ ] Database connection pooling configured
- [ ] Database indexes optimized
- [ ] Run all migrations successfully
- [ ] Test database rollback procedure
- [ ] Set up database monitoring
- [ ] Configure database SSL/TLS
- [ ] Set appropriate connection limits
- [ ] Test database failover (if applicable)

### ⚙️ Backend Configuration

- [ ] Set NODE_ENV=production
- [ ] Configure production database URL
- [ ] Set up environment variables securely (not in code)
- [ ] Configure logging level appropriately
- [ ] Set up error monitoring (e.g., Sentry)
- [ ] Configure proper timezone settings
- [ ] Set up health check endpoint
- [ ] Test backend performance under load
- [ ] Configure graceful shutdown
- [ ] Set memory limits appropriately

### 🎨 Frontend Configuration

- [ ] Build frontend for production (`npm run build`)
- [ ] Set correct API URL (production backend)
- [ ] Configure CDN for static assets
- [ ] Enable asset caching
- [ ] Minify and compress assets
- [ ] Test frontend in production mode
- [ ] Set up monitoring (e.g., Google Analytics)
- [ ] Configure error tracking
- [ ] Test all routes and pages
- [ ] Optimize images and assets

### 🐳 Docker / Infrastructure

- [ ] Use production-ready Docker images
- [ ] Don't run containers as root
- [ ] Set appropriate resource limits (CPU, memory)
- [ ] Configure auto-restart policies
- [ ] Set up container health checks
- [ ] Use multi-stage Docker builds
- [ ] Scan images for vulnerabilities
- [ ] Configure logging drivers
- [ ] Set up volume backups
- [ ] Test container orchestration

### 🌐 Networking

- [ ] Configure reverse proxy (Nginx/Apache)
- [ ] Set up load balancer (if needed)
- [ ] Configure firewall rules
- [ ] Open only necessary ports
- [ ] Set up DDoS protection
- [ ] Configure domain DNS correctly
- [ ] Test SSL/TLS certificates
- [ ] Set up CDN (CloudFlare, etc.)
- [ ] Configure proper caching headers
- [ ] Test from different geographic locations

### 📊 Monitoring & Logging

- [ ] Set up application monitoring (DataDog, New Relic, etc.)
- [ ] Configure log aggregation (ELK, CloudWatch, etc.)
- [ ] Set up alerts for critical errors
- [ ] Monitor database performance
- [ ] Track API response times
- [ ] Monitor disk space
- [ ] Set up uptime monitoring (Pingdom, UptimeRobot)
- [ ] Configure alert notifications (email, Slack, etc.)
- [ ] Set up performance monitoring
- [ ] Create monitoring dashboard

### 🧪 Testing

- [ ] Run all unit tests
- [ ] Run all integration tests
- [ ] Run end-to-end tests
- [ ] Test user registration flow
- [ ] Test login/authentication
- [ ] Test workout creation and completion
- [ ] Test motivation system triggers
- [ ] Test training plan generation
- [ ] Load test the API
- [ ] Test mobile responsiveness
- [ ] Test in multiple browsers
- [ ] Test error handling
- [ ] Test database failover

### 📝 Documentation

- [ ] Update README with production info
- [ ] Document deployment process
- [ ] Create runbook for common issues
- [ ] Document environment variables
- [ ] Create disaster recovery plan
- [ ] Document API rate limits
- [ ] Update API documentation
- [ ] Create user guide/help docs

---

## 🛠️ Environment Variables (Production)

### Backend (.env)

```bash
# Database
DATABASE_URL="postgresql://user:password@host:5432/onper_prod?sslmode=require"

# JWT (MUST CHANGE)
JWT_SECRET="generate-a-strong-random-secret-minimum-32-characters-long"

# Server
PORT=3000
NODE_ENV=production

# Frontend URL (for CORS)
FRONTEND_URL="https://your-domain.com"

# Optional: Monitoring
SENTRY_DSN="your-sentry-dsn"
```

### Frontend (.env)

```bash
# Backend API
VITE_API_URL="https://api.your-domain.com"

# Optional: Analytics
VITE_GA_ID="your-google-analytics-id"
```

---

## 🔒 Security Best Practices

### Generate Strong JWT Secret

```bash
# Generate random 64-character string
openssl rand -base64 64
```

### Database Security

1. **Use SSL/TLS** for database connections
2. **Rotate credentials** regularly
3. **Limit access** by IP address
4. **Regular backups** (automated)
5. **Encrypt backups**

### API Security

1. **Rate limiting** (prevent abuse)
2. **Input validation** (already implemented via DTOs)
3. **SQL injection prevention** (Prisma handles this)
4. **XSS protection** (Vue 3 handles this)
5. **CSRF protection** (if using cookies)

---

## 📦 Production Docker Compose

Create `docker-compose.prod.yml`:

```yaml
version: '3.8'

services:
  postgres:
    image: postgres:15-alpine
    restart: always
    environment:
      POSTGRES_USER: ${DB_USER}
      POSTGRES_PASSWORD: ${DB_PASSWORD}
      POSTGRES_DB: onper_prod
    volumes:
      - postgres_data:/var/lib/postgresql/data
    networks:
      - internal
    # Not exposed to public

  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    restart: always
    environment:
      DATABASE_URL: ${DATABASE_URL}
      JWT_SECRET: ${JWT_SECRET}
      NODE_ENV: production
    depends_on:
      - postgres
    networks:
      - internal
      - external
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000"]
      interval: 30s
      timeout: 10s
      retries: 3

  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
    restart: always
    environment:
      VITE_API_URL: ${API_URL}
    depends_on:
      - backend
    networks:
      - external
    ports:
      - "80:80"
      - "443:443"

networks:
  internal:
    driver: bridge
  external:
    driver: bridge

volumes:
  postgres_data:
```

---

## 🚀 Deployment Steps

### 1. Prepare Server

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh

# Install Docker Compose
sudo apt install docker-compose -y
```

### 2. Clone Repository

```bash
git clone https://github.com/your-org/onper.git
cd onper
```

### 3. Configure Environment

```bash
# Backend
cp backend/.env.example backend/.env
nano backend/.env  # Edit with production values

# Frontend
cp frontend/.env.example frontend/.env
nano frontend/.env  # Edit with production values
```

### 4. Build and Deploy

```bash
# Pull latest code
git pull

# Build images
docker-compose -f docker-compose.prod.yml build

# Start services
docker-compose -f docker-compose.prod.yml up -d

# Check logs
docker-compose -f docker-compose.prod.yml logs -f
```

### 5. Run Migrations

```bash
# Access backend container
docker exec -it onper-backend sh

# Run migrations
npx prisma migrate deploy

# Exit container
exit
```

### 6. Verify Deployment

```bash
# Check all services are running
docker-compose -f docker-compose.prod.yml ps

# Test API
curl https://api.your-domain.com

# Test frontend
curl https://your-domain.com
```

---

## 📊 Monitoring Setup

### Health Check Endpoints

Add to `backend/src/main.ts`:

```typescript
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.get('/health/db', async (req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.json({ status: 'ok', database: 'connected' });
  } catch (error) {
    res.status(500).json({ status: 'error', database: 'disconnected' });
  }
});
```

### Uptime Monitoring

Set up monitoring for these endpoints:
- `https://your-domain.com` (frontend)
- `https://api.your-domain.com/health` (API health)
- `https://api.your-domain.com/health/db` (database health)

---

## 🔄 Update/Rollback Procedure

### Update to New Version

```bash
# 1. Backup database
docker exec onper-db pg_dump -U postgres onper_prod > backup_$(date +%Y%m%d).sql

# 2. Pull latest code
git pull

# 3. Rebuild and restart
docker-compose -f docker-compose.prod.yml up -d --build

# 4. Run new migrations
docker exec -it onper-backend npx prisma migrate deploy

# 5. Verify
docker-compose -f docker-compose.prod.yml logs -f
```

### Rollback Procedure

```bash
# 1. Stop services
docker-compose -f docker-compose.prod.yml down

# 2. Checkout previous version
git checkout <previous-commit-hash>

# 3. Restore database (if needed)
docker exec -i onper-db psql -U postgres onper_prod < backup.sql

# 4. Restart services
docker-compose -f docker-compose.prod.yml up -d

# 5. Verify
docker-compose -f docker-compose.prod.yml logs -f
```

---

## 💾 Backup Strategy

### Automated Database Backups

Create cron job:

```bash
# Edit crontab
crontab -e

# Add daily backup at 2 AM
0 2 * * * docker exec onper-db pg_dump -U postgres onper_prod > /backups/onper_$(date +\%Y\%m\%d).sql

# Add weekly cleanup (keep last 30 days)
0 3 * * 0 find /backups -name "onper_*.sql" -mtime +30 -delete
```

### Backup Verification

```bash
# Test restore on staging
docker exec -i onper-db-staging psql -U postgres onper_staging < backup.sql
```

---

## 🚨 Incident Response

### If API is Down

1. Check logs: `docker-compose logs backend`
2. Check health: `curl http://localhost:3000/health`
3. Restart if needed: `docker-compose restart backend`
4. Check database connection
5. Review recent changes

### If Database is Down

1. Check logs: `docker-compose logs postgres`
2. Check disk space: `df -h`
3. Check database status
4. Restore from backup if necessary

### If Frontend is Down

1. Check logs: `docker-compose logs frontend`
2. Check Nginx configuration
3. Verify SSL certificates
4. Check DNS settings

---

## 📞 Support Contacts

Document your team contacts:

- **On-Call Engineer**: [Contact Info]
- **DevOps Team**: [Contact Info]
- **Database Admin**: [Contact Info]
- **Hosting Provider**: [Support Link]

---

## ✅ Post-Deployment Verification

After deployment, verify:

- [ ] Homepage loads correctly
- [ ] User can register
- [ ] User can login
- [ ] User can create workout
- [ ] Motivation message appears
- [ ] Training plan generates
- [ ] Dashboard shows correct stats
- [ ] All API endpoints respond
- [ ] SSL certificate is valid
- [ ] Monitoring is active
- [ ] Logs are being collected
- [ ] Backups are running

---

## 🎉 You're Live!

Once all checks pass, your ONPER instance is ready for production use!

**Remember:**
- Monitor logs regularly
- Check backups weekly
- Update dependencies monthly
- Review security quarterly
- Test disaster recovery annually

---

**ONPER Production Team**  
*Keep the 1% running smoothly!* 🏃

