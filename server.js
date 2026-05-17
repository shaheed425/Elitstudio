const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const connectDB = require('./config/db');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Body parser
app.use(express.json());

// Enable CORS
app.use(cors());

// Set security headers with CSP for Cloudinary
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "'unsafe-inline'"],
            styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
            imgSrc: ["'self'", "data:", "https://res.cloudinary.com", "https://images.unsplash.com"],
            fontSrc: ["'self'", "https://fonts.gstatic.com"],
            connectSrc: ["'self'", "http://localhost:5000", "https://api.cloudinary.com"],
        },
    },
}));

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Routes
app.get('/', (req, res) => {
    res.send('API is running...');
});

// Import routes
const galleryRoutes = require('./routes/galleryRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const packageRoutes = require('./routes/packageRoutes');
const testimonialRoutes = require('./routes/testimonialRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const adminRoutes = require('./routes/adminRoutes');

// Mount routes
app.use('/api/gallery', galleryRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/packages', packageRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/admin', adminRoutes);

// 404 Handler - This catches any requests that don't match the above routes
app.use((req, res, next) => {
    res.status(404).json({
        success: false,
        message: `Route ${req.originalUrl} not found on this server`,
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
        success: false,
        message: err.message || 'Internal Server Error',
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
