# 🚀 EQLIX Deployment Guide - Render.com

Follow these steps to deploy your EQLIX website to Render.com.

---

## Part 1: Deploy Backend (Web Service)

### Step 1: Create Render Account & New Web Service

1. Go to [https://render.com](https://render.com)
2. Sign up or log in (recommended: use GitHub login)
3. Click **"New +"** → **"Web Service"**
4. Click **"Connect account"** to connect your GitHub
5. Find and select: `stanlcode/eqlix-backend`
6. Click **"Connect"**

### Step 2: Configure Web Service

Fill in the following settings:

**Basic Settings:**
- **Name**: `eqlix-backend` (or your preferred name)
- **Region**: Choose closest to your users (e.g., Oregon, Frankfurt)
- **Branch**: `main`
- **Root Directory**: Leave empty (or type `backend` if repo has multiple folders)
- **Runtime**: `Node`
- **Build Command**: `npm install`
- **Start Command**: `npm start`

**Instance Type:**
- Select **"Free"** (or paid plan if preferred)

### Step 3: Add Environment Variables

Click **"Advanced"** → **"Add Environment Variable"** and add these:

```
NODE_ENV=production
CLIENT_URL=https://your-frontend-url.onrender.com
MONGODB_URI=mongodb+srv://toussaintstanley11_db_user:eR2FHxB6Lhmz5rsG@cluster0.d1ciwx6.mongodb.net/eqlix?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=eqlix-super-secret-key-change-this-in-production-2026
JWT_REFRESH_SECRET=eqlix-refresh-secret-key-change-this-too-2026
JWT_EXPIRE=15m
JWT_REFRESH_EXPIRE=7d
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=toussaintstanley11@gmail.com
EMAIL_PASSWORD=stklxsklaratepbz
EMAIL_FROM=EQLIX MEDIA CREATION <toussaintstanley11@gmail.com>
ADMIN_EMAIL=admin@eqlix.com
ADMIN_PASSWORD=Admin@2026!ChangeThis
ADMIN_FIRST_NAME=Admin
ADMIN_LAST_NAME=EQLIX
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
AUTH_RATE_LIMIT_MAX=5
MAX_FILE_SIZE=52428800
ALLOWED_FILE_TYPES=image/jpeg,image/png,image/svg+xml,application/pdf,application/zip
DEFAULT_PAGE_SIZE=10
MAX_PAGE_SIZE=100
```

> **Note**: For `CLIENT_URL`, you'll update this later with your frontend URL. For now, you can use a placeholder or leave it as localhost.

### Step 4: Deploy Backend

1. Click **"Create Web Service"**
2. Wait for deployment (takes 2-5 minutes)
3. Once deployed, you'll see: ✅ **Live** with a green indicator
4. **Copy your backend URL**: `https://eqlix-backend.onrender.com` (or similar)

### Step 5: Test Backend

Click on your backend URL and add `/health` to test:
```
https://eqlix-backend.onrender.com/health
```

You should see:
```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "2026-01-21T..."
}
```

✅ **Backend is now live!**

---

## Part 2: Deploy Frontend (Static Site)

### Step 1: Create GitHub Repository for Frontend

1. Open a terminal in your frontend directory:
   ```powershell
   cd "c:\Users\STANL\.gemini\antigravity\playground\distant-pulsar\EQX SITE"
   ```

2. Initialize Git (if not already):
   ```powershell
   git init
   git add .
   git commit -m "Initial commit - EQLIX frontend"
   ```

3. Create a new repository on GitHub:
   - Go to [https://github.com/new](https://github.com/new)
   - Name: `eqlix-frontend`
   - Make it **Public** or **Private**
   - Don't initialize with README (you already have files)
   - Click **"Create repository"**

4. Push to GitHub:
   ```powershell
   git remote add origin https://github.com/stanlcode/eqlix-frontend.git
   git branch -M main
   git push -u origin main
   ```

### Step 2: Update Backend URL in Frontend

Before deploying, update the backend URL in `api.js`:

1. Open `api.js`
2. Find line 6-9 (the API_BASE_URL section)
3. Replace `https://eqlix-backend.onrender.com/api` with your **actual backend URL** from Step 1
4. Save the file
5. Commit and push:
   ```powershell
   git add api.js
   git commit -m "Update backend URL for production"
   git push
   ```

### Step 3: Create Render Static Site

1. Go back to Render dashboard
2. Click **"New +"** → **"Static Site"**
3. Connect to your `eqlix-frontend` repository
4. Click **"Connect"**

### Step 4: Configure Static Site

**Basic Settings:**
- **Name**: `eqlix-frontend` (or your preferred name)
- **Branch**: `main`
- **Root Directory**: Leave empty
- **Build Command**: Leave empty (no build needed for static HTML)
- **Publish Directory**: `.` (just a dot, means root)

### Step 5: Deploy Frontend

1. Click **"Create Static Site"**
2. Wait for deployment (takes 1-2 minutes)
3. Once deployed, you'll see: ✅ **Live**
4. **Copy your frontend URL**: `https://eqlix-frontend.onrender.com` (or similar)

### Step 6: Update Backend CORS

Now that you have your frontend URL, update the backend:

1. Go to your backend service on Render
2. Click **"Environment"** in the left sidebar
3. Find `CLIENT_URL` variable
4. Update it to your frontend URL: `https://eqlix-frontend.onrender.com`
5. Click **"Save Changes"**
6. Backend will automatically redeploy (takes 1-2 minutes)

---

## Part 3: Testing & Verification

### Test 1: Open Your Website
Visit your frontend URL: `https://eqlix-frontend.onrender.com`

### Test 2: Contact Form
1. Navigate to the Contact page
2. Fill out the form
3. Submit
4. Check for success message
5. Check your email inbox for the contact form submission

### Test 3: User Registration
1. Click **"Espace Client"**
2. Register a new account
3. Check your email for registration confirmation
4. Log in with your credentials
5. Verify you're redirected to the dashboard

### Test 4: Navigation
- Test all navigation links
- Verify dark mode toggle works
- Check responsive design on mobile (use browser dev tools)

---

## 🎉 Deployment Complete!

Your EQLIX website is now live!

**URLs:**
- Frontend: `https://eqlix-frontend.onrender.com`
- Backend API: `https://eqlix-backend.onrender.com`

---

## ⚠️ Important Notes

### Free Tier Limitations
- Services spin down after 15 minutes of inactivity
- First request after inactivity takes 30-60 seconds (cold start)
- Consider upgrading to paid plan for production use

### MongoDB Atlas
- Ensure Render IPs are whitelisted in MongoDB Atlas
- Go to MongoDB Atlas → Network Access → Add IP Address → Allow Access from Anywhere (`0.0.0.0/0`)

### Custom Domain (Optional)
To use your own domain:
1. Go to your static site on Render
2. Click **"Settings"** → **"Custom Domains"**
3. Add your domain and follow DNS instructions

---

## 🐛 Troubleshooting

### Backend won't start
- Check logs in Render dashboard
- Verify all environment variables are set correctly
- Check MongoDB connection string

### CORS errors
- Verify `CLIENT_URL` matches your frontend URL exactly
- No trailing slash in URLs

### Contact form not working
- Check backend logs for errors
- Verify email credentials are correct
- Test email sending from backend logs

### Frontend shows old content
- Clear browser cache
- Hard refresh: `Ctrl + Shift + R` (Windows) or `Cmd + Shift + R` (Mac)

---

## 📞 Need Help?

If you encounter issues:
1. Check Render logs (click on your service → "Logs" tab)
2. Check browser console for errors (F12 → Console)
3. Verify all environment variables are set correctly
