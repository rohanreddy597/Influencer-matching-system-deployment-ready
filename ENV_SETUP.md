# Environment Variables Configuration Guide

## Local Development (.env)

Create a `.env` file in the root directory:

```bash
# Database
MONGO_URI=mongodb://localhost:27017/influencer_matching

# Server
NODE_ENV=development
PORT=8080

# Sessions & Security
SESSION_SECRET=your-local-dev-secret-min-32-chars-long

# Google OAuth (from Google Cloud Console)
CLIENT_ID=your-google-client-id.apps.googleusercontent.com
CLIENT_SECRET=your-google-client-secret

# Frontend
CORS_ORIGIN=http://localhost:4200
```

---

## Production (.env.production)

When deploying to cloud:

```bash
# Database - MongoDB Atlas
MONGO_URI=mongodb+srv://admin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/influencer_matching?retryWrites=true&w=majority

# Server
NODE_ENV=production
PORT=8080

# Sessions & Security - GENERATE NEW SECRET!
SESSION_SECRET=generate-strong-random-secret-with-at-least-32-characters

# Google OAuth (Update redirect URIs first!)
CLIENT_ID=your-google-client-id.apps.googleusercontent.com
CLIENT_SECRET=your-google-client-secret

# Frontend
CORS_ORIGIN=https://your-deployed-domain.onrender.com
```

---

## 🔐 How to Generate SESSION_SECRET

**Option 1: Node.js CLI**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

**Option 2: Online Generator**
Go to: https://randomkeygen.com/ and copy the "Arg2: 32-Byte Key"

**Option 3: Manual (use this pattern)**
```
a!B2c$D4e%F6g&H8i*J0k(L2m)N4o-P6q=R8s+T0u|V2w~X4y.Z6a1B3C5D7E9F1H3J5K7L9M
```

---

## 📝 Setting in Cloud Platforms

### Render.com

1. Dashboard → Your Service
2. **Settings** tab
3. Scroll to **Environment**
4. Click **Add Environment Variable**
5. Enter each variable:
   - **Key**: `NODE_ENV`
   - **Value**: `production`
6. Repeat for each variable
7. App auto-redeploys

### Railway.app

1. Dashboard → Your Project
2. **Variables** tab
3. Click **Add Variable**
4. Enter Key and Value
5. Service redeploys automatically

### Fly.io

```bash
fly secrets set NODE_ENV=production
fly secrets set MONGO_URI="mongodb+srv://..."
fly secrets set SESSION_SECRET="your-secret"
fly secrets set CLIENT_ID="..."
fly secrets set CLIENT_SECRET="..."
```

---

## ✅ Verification

After setting environment variables:

```bash
# Test local connection
npm run dev

# Check backend is running
curl http://localhost:8080/api/test

# Check database
curl http://localhost:8080/influencers
```

---

## ⚠️ Important Security Notes

1. **Never commit `.env` files** - Already in `.gitignore`
2. **Use different secrets** for dev and production
3. **Regenerate secrets** if you suspect compromise
4. **Whitelist IPs** for MongoDB Atlas:
   - Development: Your IP address
   - Production: Use "Allow from anywhere" (0.0.0.0/0) or cloud IP range
5. **Keep credentials private** - Don't share via email, Slack, etc.

---

## 🔄 Updating Variables in Production

### Render.com
1. Change variable in dashboard
2. Click **Save Changes**
3. App redeploys (2-5 minutes)

### After Changes
Push code change to trigger redeploy:
```bash
git commit --allow-empty -m "Redeploy app"
git push
```

---

## 📋 Checklist

- [ ] `.env` created locally with dev credentials
- [ ] `MONGO_URI` points to local MongoDB or MongoDB Atlas
- [ ] `SESSION_SECRET` is unique and secure (32+ chars)
- [ ] Google OAuth `CLIENT_ID` and `CLIENT_SECRET` from console.cloud.google.com
- [ ] `.env` file is in `.gitignore` (never commit it!)
- [ ] Production variables set in cloud dashboard
- [ ] All variables verified working before deploying
- [ ] Google OAuth redirect URIs updated for production URL

