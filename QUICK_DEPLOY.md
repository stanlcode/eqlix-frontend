# 🚀 Quick Deployment Steps

## Step 1: Deploy Backend (5 minutes)

1. Go to https://render.com and sign in with GitHub
2. Click **New +** → **Web Service**
3. Select repository: `stanlcode/eqlix-backend`
4. Settings:
   - Name: `eqlix-backend`
   - Build: `npm install`
   - Start: `npm start`
5. Add environment variables (copy from backend/.env)
6. Click **Create Web Service**
7. Wait for deployment ✅
8. **Copy your backend URL** (e.g., `https://eqlix-backend.onrender.com`)

## Step 2: Create Frontend GitHub Repo (2 minutes)

1. Go to https://github.com/new
2. Name: `eqlix-frontend`
3. Click **Create repository**
4. Run these commands:

```powershell
cd "c:\Users\STANL\.gemini\antigravity\playground\distant-pulsar\EQX SITE"
git remote add origin https://github.com/stanlcode/eqlix-frontend.git
git push -u origin main
```

## Step 3: Update Backend URL (1 minute)

1. Open `api.js` in your editor
2. Find line 9: `https://eqlix-backend.onrender.com/api`
3. Replace with **your actual backend URL** from Step 1
4. Save and push:

```powershell
git add api.js
git commit -m "Update backend URL"
git push
```

## Step 4: Deploy Frontend (3 minutes)

1. Go back to Render dashboard
2. Click **New +** → **Static Site**
3. Select repository: `eqlix-frontend`
4. Settings:
   - Name: `eqlix-frontend`
   - Build: (leave empty)
   - Publish: `.`
5. Click **Create Static Site**
6. Wait for deployment ✅
7. **Copy your frontend URL** (e.g., `https://eqlix-frontend.onrender.com`)

## Step 5: Update CORS (1 minute)

1. Go to backend service on Render
2. Click **Environment**
3. Update `CLIENT_URL` to your frontend URL from Step 4
4. Save (backend will auto-redeploy)

## Step 6: Test! 🎉

Visit your frontend URL and test:
- ✅ Contact form
- ✅ User registration
- ✅ Login
- ✅ Navigation

---

**Total Time: ~12 minutes**

For detailed instructions, see [RENDER_DEPLOYMENT_GUIDE.md](./RENDER_DEPLOYMENT_GUIDE.md)
