import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import compression from 'compression';
import morgan from 'morgan';
import dotenv from 'dotenv';
import noteRoutes from './routes/noteRoutes.js'; // ✅ only this

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// 🛡 Security Middleware
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));

// 🚦 Rate Limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 1000,
  message: {
    success: false,
    message: 'Too many requests, try again later.'
  }
});
app.use(limiter);

// 🌍 CORS
app.use(cors({
  origin: process.env.FRONTEND_URL || ["http://localhost:3000", "http://127.0.0.1:3000", "http://localhost:5500"],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// 🗜 Compression + Logging
app.use(compression());
app.use(morgan('combined'));

// 🧠 Body Parser
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// 🧩 MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/mynotes-pro';
mongoose.connect(MONGODB_URI)

.then(() => console.log('✅ MongoDB connected successfully'))
.catch((err) => {
  console.error('❌ MongoDB connection error:', err);
  process.exit(1);
});

// 🗂 Routes
app.use('/api/notes', noteRoutes);

// 🩺 Health Check
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Backend is running fine 🚀',
    db: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
  });
});

// 🚫 404 Handler
app.use('/api/*', (req, res) => {
  res.status(404).json({
    success: false,
    message: `API endpoint ${req.originalUrl} not found`
  });
});

// 🧯 Global Error Handler
app.use((err, req, res, next) => {
  console.error('🚨 Error:', err);
  res.status(500).json({
    success: false,
    message: err.message || 'Internal server error'
  });
});

// 🚀 Start Server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🎉 Server running on port ${PORT}`);
});
