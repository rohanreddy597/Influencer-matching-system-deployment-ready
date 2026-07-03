# 🚀 Free Deployment Guide - Influencer Matching System

Deploy your app to the public internet for FREE using Docker and cloud services!

---

## 📋 Prerequisites

- Docker installed locally
- GitHub account (for source code)
- Google Cloud credentials (for OAuth)

---

## Option 1: Deploy on Render.com (Recommended - Easiest)

### Step 1: Create MongoDB Atlas Database (Free Tier)

1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up for free
3. Create a new project
4. Create a M0 Sandbox Cluster (free forever)
5. Create a database user:
   - Username: `admin`
   - Password: Generate strong password, save it
6. Whitelist IP: Click "Allow Access from Anywhere" (0.0.0.0/0)
7. Copy connection string:
   ```
   mongodb+srv://admin:<password>@cluster0.xxxxx.mongodb.net/influencer_matching?retryWrites=true&w=majority
   ```
   Replace `<password>` with your password

### Step 2: Push Code to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/influencer-matching.git
git push -u origin main
```

### Step 3: Deploy on Render.com

1. Go to [render.com](https://render.com)
2. Sign up with GitHub
3. Click "New +" → "Web Service"
4. Connect your GitHub repository
5. Configure:
   - **Name**: `influencer-matching`
   - **Environment**: `Docker`
   - **Region**: Your closest region
   - **Branch**: `main`
   
6. Add Environment Variables:
   ```
   NODE_ENV=production
   MONGO_URI=mongodb+srv://admin:<password>@cluster0.xxxxx.mongodb.net/influencer_matching?retryWrites=true&w=majority
   SESSION_SECRET=your-random-secret-key-min-32-chars
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   ```

7. Click "Deploy"
8. Wait 5-10 minutes for build to complete
9. Your app is now live at: `https://influencer-matching.onrender.com`

---

## Option 2: Deploy on Railway.app (Also Free)

### Step 1: MongoDB Atlas (Same as above)

### Step 2: Push to GitHub (Same as above)

### Step 3: Deploy on Railway

1. Go to [railway.app](https://railway.app)
2. Sign up with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your `influencer-matching` repository
5. Add environment variables:
   ```
   NODE_ENV=production
   MONGO_URI=mongodb+srv://admin:<password>@cluster0.xxxxx.mongodb.net/influencer_matching?retryWrites=true&w=majority
   SESSION_SECRET=your-random-secret-key
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   ```

6. Railway auto-detects Docker and deploys
7. Your app will be available at: `https://influencer-matching-production.railway.app`

---

## Option 3: Deploy on Fly.io (Free Tier)

### Step 1: MongoDB Atlas (Same as above)

### Step 2: Install Fly CLI

```bash
# Windows
choco install flyctl

# macOS
brew install flyctl

# Linux
curl -L https://fly.io/install.sh | sh
```

### Step 3: Initialize and Deploy

```bash
# Login to Fly.io
fly auth login

# Initialize your app
fly launch

# Set environment variables
fly secrets set MONGO_URI="mongodb+srv://admin:password@cluster0.xxxxx.mongodb.net/influencer_matching?retryWrites=true&w=majority"
fly secrets set SESSION_SECRET="your-random-secret"
fly secrets set GOOGLE_CLIENT_ID="your-google-client-id"
fly secrets set GOOGLE_CLIENT_SECRET="your-google-client-secret"

# Deploy
fly deploy
```

Your app will be available at: `https://your-app-name.fly.dev`

---

## 🔒 Update Google OAuth for Production

### Step 1: Go to Google Cloud Console
1. Navigate to [console.cloud.google.com](https://console.cloud.google.com)
2. Go to "APIs & Services" → "Credentials"
3. Click on your OAuth 2.0 Client ID
4. Add authorized redirect URIs:
   ```
   https://your-deployed-url.com/auth/google/callback
   https://your-deployed-url.com/api/google-login
   https://localhost:8080/auth/google/callback
   ```

### Step 2: Update .env in Production
Use the environment variables in your deployment platform (Render, Railway, or Fly.io)

---

## 🧪 Test Locally with Docker

Before deploying, test locally:

```bash
# Build Docker image
docker build -t influencer-matching .

# Run with docker-compose
docker-compose up

# App will be at http://localhost:8080
```

---

## 📊 Free Tier Limits

| Service | Limit |
|---------|-------|
| **MongoDB Atlas** | 512 MB storage, free forever |
| **Render.com** | 750 hours/month free, auto-sleeps after 15 mins inactivity |
| **Railway.app** | $5 free credit/month |
| **Fly.io** | 3 shared-cpu-1x 256MB VMs free |

---

## 🚨 Important Notes

1. **Free tier apps sleep**: On Render, if no traffic for 15 mins, app goes to sleep. First request takes 30 seconds to wake up.
2. **No database sleep**: MongoDB Atlas stays active
3. **Bandwidth limits**: All have generous free bandwidth
4. **Email notifications**: Set up to get alerts if app crashes

---

## 🔄 Continuous Deployment

Push to GitHub and your app auto-redeploys:

```bash
git add .
git commit -m "Update landing page"
git push origin main
```

Deployment happens automatically in ~2-5 minutes!

---

## ✅ Verification Checklist

- [ ] MongoDB Atlas cluster created
- [ ] GitHub repository created and pushed
- [ ] Render/Railway/Fly account created
- [ ] Environment variables configured
- [ ] Google OAuth URIs updated
- [ ] App deployed successfully
- [ ] Can access app at public URL
- [ ] Login buttons work
- [ ] Database connections work

---

## 🆘 Troubleshooting

### App crashes after deploy
Check logs in your platform dashboard (Render → Logs, Railway → Logs, Fly.io → `fly logs`)

### MongoDB connection fails
- Verify connection string is correct
- Check IP whitelist in MongoDB Atlas (0.0.0.0/0)
- Ensure username/password have no special characters (use URL encoding if needed)

### Google OAuth not working
- Check redirect URIs in Google Cloud Console
- Verify GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET are set
- Ensure user is in test mode if app not published

### App goes to sleep (Render)
- Upgrade to paid plan ($7/month) to keep running
- Or accept 30-second wake-up time for free tier

---

## 💡 Next Steps

1. Deploy to production
2. Share public URL with others
3. Collect feedback
4. Add features based on feedback
5. Scale up if needed

**Your app is now accessible 24/7 to anyone on the internet!** 🌍

