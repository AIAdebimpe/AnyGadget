const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, "Please provide your full name"],
        trim: true
    },
    email: {
        type: String,
        required: [true, "Please provide a valid email address"],
        unique: true, // Prevents duplicate email signups across AnyGadget
        trim: true,
        lowercase: true // Automatically converts input to lowercase to prevent casing auth bugs
    },
    password: {
        type: String,
        required: [true, "Please provide a secure password"],
        minlength: [6, "Password must be at least 6 characters long"]
    },
    role: {
        type: String,
        enum: ['customer', 'admin'],
        default: 'customer' // Automatically secures administrative entry lanes
    },
    shippingAddress: {
        street: { type: String, default: "" },
        city: { type: String, default: "" },
        state: { type: String, default: "" },
        postalCode: { type: String, default: "" },
        country: { type: String, default: "" }
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User', userSchema);