const jwt = require('jsonwebtoken');
const User = require('../models/User');

// ========================================================
// 🛡️ CHECKPOINT 1: VERIFY TOKEN (Is the user logged in?)
// ========================================================
const protect = async (req, res, next) => {
    let token;

    // Check if the request contains a Bearer token in the Authorization header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Extract token from the "Bearer <TOKEN>" string
            token = req.headers.authorization.split(' ')[1];

            // Verify token signature using our secret key
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Fetch user profile from database (excluding the hashed password) and attach it to the request
            req.user = await User.findById(decoded.id).select('-password');
            
            // Pass along to the next security checkpoint or controller function!
            return next();
        } catch (error) {
            return res.status(401).json({ message: "Not authorized, token validation failed." });
        }
    }

    if (!token) {
        return res.status(401).json({ message: "Not authorized, no security token provided." });
    }
};

// ========================================================
// 🛡️ CHECKPOINT 2: VERIFY ADMIN ROLE (Are they an admin?)
// ========================================================
const admin = (req, res, next) => {
    // Check if the user exists and has the admin role flag
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(403).json({ message: "Access denied. Administrative privileges required." });
    }
};

module.exports = { protect, admin };