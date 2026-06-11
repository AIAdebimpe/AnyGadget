const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// ==========================================
// 📝 USER REGISTRATION LOGIC
// ==========================================
exports.register = async (req, res) => {
    try {
        const { fullName, email, password } = req.body;

        // 1. Check if the user already has an account with AnyGadget
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "An account with this email already exists." });
        }

        // 2. Encrypt the password so it's safely unreadable in the database
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // 3. Create the new customer profile container
        const newUser = new User({
            fullName,
            email,
            password: hashedPassword,
            role: 'customer'
        });

        await newUser.save();

        res.status(201).json({ 
            success: true, 
            message: "Welcome to AnyGadget! Account created successfully." 
        });

    } catch (error) {
        res.status(500).json({ message: "Server error during registration", error: error.message });
    }
};

// ==========================================
// 🔑 USER LOGIN LOGIC
// ==========================================
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. Verify the user exists in our records
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password credentials." });
        }

        // 2. Check if the input password matches our encrypted database hash
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password credentials." });
        }

        // 3. Sign a secure JWT Token so the React Frontend can remember the session
        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '24h' } // Token auto-expires in 1 day for security
        );

        // 4. Return user info and token back across the wire
        res.status(200).json({
            success: true,
            token,
            user: {
                id: user._id,
                fullName: user.fullName,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        res.status(500).json({ message: "Server error during login", error: error.message });
    }
};