# EcoReport - Environmental Feedback System

A MERN stack application for reporting environmental issues to government authorities.

## 🚀 Quick Start

### One Command Setup
```bash
# Install all dependencies and start both servers
npm run install-all
npm run dev
```

## 🌐 Access Points

- **Frontend**: `http://localhost:3000`
- **Backend API**: `http://localhost:5000`
- **Admin login**: `http://localhost:3000/admin-login`

### Admin Credentials
- **Email**: `admin@ecoreport.com`
- **Password**: `admin123`

## 🛠 Manual Setup

### Prerequisites
- Node.js (v16+)
- MongoDB
- Git

### Backend Setup
```bash
cd backend
npm install
npm start
```

### Frontend Setup
```bash
cd frontend
npm install
npm start
```

## 📋 Available Scripts

- `npm run dev` - Start both backend and frontend
- `npm run backend` - Start only backend
- `npm run frontend` - Start only frontend
- `npm run install-all` - Install all dependencies

## 🔧 Configuration

### Environment Variables (backend/.env)
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/feedback-db
JWT_SECRET=your_jwt_secret_key_here_12345
```

## 🌟 Features

- ✅ **React frontend** with Material-UI
- ✅ **Express.js backend** with MongoDB
- ✅ **User authentication** and authorization
- ✅ **File upload** with local storage
- ✅ **Real-time complaint tracking**
- ✅ **Admin dashboard** with media display
- ✅ **Responsive design**

## 🔐 User Roles

### Public Users
- Register and login via `/login`
- Submit complaints with media
- Track complaint status
- Provide feedback

### Admin Users
- Login via `/admin-login`
- View all complaints
- Update complaint status
- Access dashboard statistics

## 🎯 Usage Flow

1. **Start application**: `npm run dev`
2. **Public access**: `http://localhost:3000`
3. **Admin access**: `http://localhost:3000/admin-login`
4. **Submit complaints** with photos/videos
5. **Admin manages** complaints and updates status

## 🔧 Troubleshooting

### Port Issues
- Frontend runs on port 3000
- Backend runs on port 5000
- Ensure ports are available

### Database Issues
- Ensure MongoDB is running
- Check connection string in .env
- Admin user auto-created on startup