const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const complaintRoutes = require('./routes/complaints');
const adminRoutes = require('./routes/admin');

const app = express();

// Middleware - Allow all origins and ports
// app.use(cors({
//   origin: function (origin, callback) {
//     // Allow requests with no origin (mobile apps, etc.)
//     if (!origin) return callback(null, true);
    
    
//     // Allow all localhost and local network requests
//     if (origin.includes('localhost') || origin.includes('127.0.0.1') || origin.includes('192.168.')) {
//       return callback(null, true);
//     }
    
//     // Allow all origins for development
//     return callback(null, true);
//   },
//   credentials: true
// }));
app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:3002'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['set-cookie']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'EcoReport Backend is running',
    port: process.env.PORT || 5000
  });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/complaints', complaintRoutes);
app.use('/api/admin', adminRoutes);

// MongoDB connection with retry logic
const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/feedback-db';
    
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    
    console.log('✅ MongoDB connected successfully');
  } catch (error) {
    console.log('❌ MongoDB connection error:', error.message);
    
    if (error.message.includes('IP') || error.message.includes('whitelist')) {
      console.log('🔧 SOLUTION: Add your IP to MongoDB Atlas whitelist:');
      console.log('   1. Go to https://cloud.mongodb.com/');
      console.log('   2. Navigate to Network Access');
      console.log('   3. Click "Add IP Address"');
      console.log('   4. Add your current IP or use 0.0.0.0/0 for all IPs');
    }
    
    console.log('🔄 Retrying connection in 5 seconds...');
    setTimeout(connectDB, 5000);
  }
};

connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Backend server running on port ${PORT}`);
  console.log(`📡 Accessible from any network interface`);
  console.log(`🔗 Health check: http://localhost:${PORT}/health`);
});