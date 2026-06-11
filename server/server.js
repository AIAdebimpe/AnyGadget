const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables from our .env file
dotenv.config();

const app = express();

// ==========================================
// 🛡️ MIDDLEWARE SETUP
// ==========================================

// Enable CORS so our React frontend (running on a different port) can talk to our API
app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173', // Vite's default local port
    credentials: true
}));

// Built-in body parser to read incoming JSON data payloads
app.use(express.json());

// ==========================================
// 🗄️ DATABASE CONNECTION
// ==========================================
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
    .then(() => console.log("🔌 Connected seamlessly to AnyGadget Cluster Database."))
    .catch((err) => {
        console.error("❌ MongoDB connection critical failure:", err.message);
        process.exit(1); // Stop the server execution immediately
    });

// ==========================================
// 🛣️ BASE BOOTSTRAP ROUTES
// ==========================================
app.get('/api/health', (req, res) => {
    res.status200().json({
        status: "healthy",
        message: "AnyGadget Core API Engine running smoothly.",
        timestamp: new Date()
    });
});


const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

const productRoutes = require('./routes/productRoutes');
app.use('/api/products', productRoutes);

// ==========================================
// 🚀 SERVER INITIALIZATION
// ==========================================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 AnyGadget Backend API launched on port ${PORT}`);
});