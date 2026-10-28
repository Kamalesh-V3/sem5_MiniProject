require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const { connectDB } = require('./config/db');

const authRoutes = require('./routes/authRoutes');
const artRoutes = require('./routes/artRoutes');
const orderRoutes = require('./routes/orderRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Static uploads and local image folders
app.use('/uploads', express.static(uploadsDir));
const localImagesDir = path.join(__dirname, '..', 'images');
const frontendImagesDir = path.join(__dirname, '..', 'frontend', 'public', 'images');
if (fs.existsSync(localImagesDir)) {
  app.use('/images', express.static(localImagesDir));
}
if (fs.existsSync(frontendImagesDir)) {
  app.use('/images', express.static(frontendImagesDir));
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    appName: 'CanvasCraft Art Gallery & Marketplace API',
    timestamp: new Date().toISOString()
  });
});

// Founders endpoint
app.get('/api/founders', (req, res) => {
  res.json({
    success: true,
    founders: [
      {
        name: 'Kamalesh V',
        title: 'Founder 1',
        role: '3rd year, Computer Science Engineering',
        bio: 'Mepco Schlenk Engineering College, Tamil Nadu, India.',
        image: '/images/Profile image/founder-kamalesh.svg',
        quote: 'Building a space where artists can share their work and reach new audiences.',
        socials: {
          linkedin: 'https://linkedin.com',
          github: 'https://github.com',
          instagram: 'https://instagram.com'
        }
      },
      {
        name: 'SivaKumar S',
        title: 'Founder 2',
        role: '3rd year, Computer Science Engineering',
        bio: 'Mepco Schlenk Engineering College, Tamil Nadu, India.',
        image: '/images/Profile image/founder-sivakumar.svg',
        quote: 'Connecting creators and collectors through a welcoming art marketplace.',
        socials: {
          linkedin: 'https://linkedin.com',
          github: 'https://github.com',
          instagram: 'https://instagram.com'
        }
      }
    ]
  });
});

// Mount Routes
app.use('/api/auth', authRoutes);
app.use('/api/arts', artRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/admin', adminRoutes);

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error('Unhandled Server Error:', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
});

// Start Server & Connect Database
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`=======================================================`);
    console.log(`  CANVASCRAFT ART GALLERY BACKEND RUNNING ON PORT ${PORT}`);
    console.log(`  API Health: http://localhost:${PORT}/api/health`);
    console.log(`=======================================================`);
  });
});
