import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import resumeRoutes from './routes/resumeRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
const allowedOrigins = [
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  process.env.CLIENT_URL
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps, curl, postman) or if in allowed list
    if (!origin || allowedOrigins.includes(origin) || process.env.NODE_ENV !== 'production') {
      return callback(null, true);
    }
    return callback(null, true); // Permissive CORS for deployed demo
  },
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Root & Health Check Routes
app.get('/', (req, res) => {
  res.status(200).json({
    status: 'online',
    service: 'HireLens Backend API',
    endpoints: {
      health: '/api/health',
      auth: '/api/auth',
      resumes: '/api/resumes'
    }
  });
});

app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'HireLens Node Main Backend'
  });
});

// Normalize double slashes in URL requests (e.g. //auth/login -> /auth/login)
app.use((req, res, next) => {
  if (req.url && req.url.includes('//')) {
    req.url = req.url.replace(/\/+/g, '/');
  }
  next();
});

// Mount Routes (Supports both with /api and without /api)
app.use('/api/auth', authRoutes);
app.use('/auth', authRoutes);
app.use('/api/resumes', resumeRoutes);
app.use('/resumes', resumeRoutes);

// Error Handling Middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`[Server] AI Career Copilot Server running on port ${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
});
