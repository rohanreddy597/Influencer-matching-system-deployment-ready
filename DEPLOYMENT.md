# Influencer Matching System - Deployment Guide

## 🚀 Quick Start (Development)

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)
- Google OAuth credentials

### Setup

1. **Clone & Install**
```bash
npm install
```

2. **Configure Environment**
```bash
cp .env.example .env
# Edit .env with your credentials
```

3. **Run Development Servers**
```bash
# Terminal 1: Start backend
npm run server

# Terminal 2: Start frontend
npm start
```

Visit `http://localhost:4200`

---

## 🐳 Docker Deployment

### Local Docker Setup

1. **Build & Run with Docker Compose**
```bash
docker-compose up --build
```

2. **Access Application**
- Frontend: `http://localhost:4200`
- Backend: `http://localhost:8080`
- MongoDB: `localhost:27017`

3. **View Logs**
```bash
docker-compose logs -f backend
docker-compose logs -f frontend
```

### Production Docker Build

1. **Build Images**
```bash
docker build -f Dockerfile.server -t influencer-matching:backend .
docker build -f Dockerfile.frontend -t influencer-matching:frontend .
```

2. **Run Containers**
```bash
# Backend
docker run -p 8080:8080 \
  -e MONGO_URI=mongodb://mongodb:27017/influencer_matching \
  -e CLIENT_ID=your_client_id \
  -e CLIENT_SECRET=your_client_secret \
  influencer-matching:backend

# Frontend
docker run -p 4200:80 influencer-matching:frontend
```

---

## ☁️ Cloud Deployment (AWS, Azure, GCP)

### AWS Deployment (Elastic Beanstalk)

1. **Create `.ebextensions/node.config`**
```yaml
option_settings:
  aws:elasticbeanstalk:container:nodejs:
    NodeVersion: 18.0.0
  aws:elasticbeanstalk:application:environment:
    MONGO_URI: "your_mongo_connection_string"
    CLIENT_ID: "your_client_id"
    CLIENT_SECRET: "your_client_secret"
```

2. **Deploy**
```bash
eb init -p node.js-18 influencer-matching
eb create influencer-matching-env
eb deploy
```

### Azure Container Instances

1. **Push to Azure Container Registry**
```bash
az acr build --registry myRegistry --image influencer-matching:latest .
```

2. **Deploy**
```bash
az container create \
  --resource-group myGroup \
  --name influencer-matching \
  --image myRegistry.azurecr.io/influencer-matching:latest \
  --ports 80 8080
```

### Google Cloud Run

1. **Build & Push**
```bash
gcloud builds submit --tag gcr.io/PROJECT_ID/influencer-matching
```

2. **Deploy**
```bash
gcloud run deploy influencer-matching \
  --image gcr.io/PROJECT_ID/influencer-matching \
  --platform managed \
  --region us-central1
```

---

## 🔧 Environment Configuration

### Required Variables
```env
# Database
MONGO_URI=mongodb+srv://user:password@cluster.mongodb.net/influencer_matching

# Google OAuth
CLIENT_ID=xxx.apps.googleusercontent.com
CLIENT_SECRET=xxx

# Session
SESSION_SECRET=your_secure_random_string

# Application
NODE_ENV=production
FRONTEND_URL=https://yourdomain.com
```

### Optional Variables
```env
# Email (for notifications)
EMAIL_SERVICE=gmail
EMAIL_USER=noreply@yourdomain.com
EMAIL_PASSWORD=your_app_password

# JWT
JWT_SECRET=your_jwt_secret
JWT_EXPIRY=7d

# Database Connection Pool
DB_POOL_SIZE=10
DB_CONNECTION_TIMEOUT=5000
```

---

## 🔐 Security Checklist

- [ ] Set `NODE_ENV=production`
- [ ] Use strong `SESSION_SECRET` & `JWT_SECRET`
- [ ] Enable HTTPS/SSL
- [ ] Set CORS to specific domains only
- [ ] Use MongoDB Atlas with authentication
- [ ] Enable rate limiting
- [ ] Set security headers
- [ ] Rotate credentials regularly
- [ ] Use environment variables for all secrets
- [ ] Enable MongoDB encryption at rest

---

## 📊 Performance Optimization

### Frontend
- Build with production mode: `ng build --configuration production`
- Enable gzip compression (configured in nginx.conf)
- Lazy load routes
- Use OnPush change detection
- Optimize images

### Backend
- Enable database connection pooling
- Use caching strategies
- Implement pagination for large datasets
- Add API rate limiting
- Monitor response times

---

## 📈 Monitoring & Logs

### Application Logs
```bash
# Docker
docker-compose logs -f

# Direct
tail -f logs/app.log
```

### Health Check
```bash
curl http://localhost:8080/health
```

---

## 🐛 Troubleshooting

### MongoDB Connection Issues
```bash
# Check connection string
mongosh "mongodb+srv://user:pass@cluster.mongodb.net/"

# Verify network access in MongoDB Atlas
```

### OAuth Errors
- Verify Client ID & Secret are correct
- Add authorized redirect URIs in Google Console
- Check if app is in testing mode (add test users)

### CORS Issues
- Update `FRONTEND_URL` environment variable
- Ensure CORS middleware in backend is configured

---

## 🔄 CI/CD Pipeline

### GitHub Actions Example
```yaml
name: Deploy to Production
on: [push]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Build Docker images
        run: docker-compose build
      - name: Push to registry
        run: docker push myregistry/influencer-matching
      - name: Deploy
        run: kubectl apply -f deployment.yaml
```

---

## 📚 Additional Resources

- [Angular Deployment Guide](https://angular.io/guide/deployment)
- [Express.js Production Best Practices](https://expressjs.com/en/advanced/best-practice-performance.html)
- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)
- [Docker Documentation](https://docs.docker.com/)

---

**Last Updated:** 2026-07-03
**Version:** 1.0.0
