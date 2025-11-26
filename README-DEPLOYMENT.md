# 🚀 EcoReport - Netlify Deployment Guide

## 📋 Pre-deployment Checklist

### ✅ Frontend (Netlify)
- [x] Netlify configuration (`netlify.toml`)
- [x] Production environment variables
- [x] SPA routing redirects
- [x] Build optimization
- [x] API configuration for production

### 🔧 Backend Deployment (Required)
Deploy your backend to one of these platforms:
- **Heroku** (Recommended)
- **Railway**
- **Render**
- **DigitalOcean**

## 🌐 Netlify Deployment Steps

### 1. Connect Repository
1. Go to [Netlify](https://netlify.com)
2. Click "New site from Git"
3. Connect your GitHub repository
4. Select `raushanaman/eco-report-feedback`

### 2. Build Settings
- **Base directory**: `frontend`
- **Build command**: `npm run build`
- **Publish directory**: `frontend/build`

### 3. Environment Variables
Add these in Netlify dashboard → Site settings → Environment variables:
```
REACT_APP_API_URL=https://your-backend-url.herokuapp.com
REACT_APP_ENV=production
```

### 4. Deploy
Click "Deploy site" - Netlify will automatically build and deploy!

## 🔗 Backend Deployment (Heroku Example)

### 1. Install Heroku CLI
```bash
npm install -g heroku
```

### 2. Deploy Backend
```bash
cd backend
heroku create your-app-name-backend
git subtree push --prefix backend heroku master
```

### 3. Set Environment Variables
```bash
heroku config:set MONGODB_URI=your-mongodb-atlas-uri
heroku config:set JWT_SECRET=your-jwt-secret
```

### 4. Update Frontend Environment
Update `frontend/.env.production`:
```
REACT_APP_API_URL=https://your-app-name-backend.herokuapp.com
```

## 🎯 Post-Deployment

### Update API URL
1. Deploy backend first
2. Get backend URL (e.g., `https://your-app.herokuapp.com`)
3. Update `REACT_APP_API_URL` in Netlify environment variables
4. Redeploy frontend

### Test Production
- ✅ User registration/login
- ✅ Complaint submission
- ✅ File uploads
- ✅ Admin dashboard
- ✅ Environmental slider

## 🔒 Security Notes
- Use HTTPS URLs only
- Set proper CORS origins in backend
- Use environment variables for secrets
- Enable MongoDB Atlas IP whitelist

## 📱 Performance
- Images optimized via Unsplash CDN
- Build artifacts cached
- Gzip compression enabled
- Static assets cached for 1 year

Your EcoReport app is now production-ready! 🌱