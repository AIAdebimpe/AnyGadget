const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide the gadget name"],
        trim: true
    },
    description: {
        type: String,
        required: [true, "Please provide the product description"]
    },
    price: {
        type: Number,
        required: [true, "Please specify the item price"],
        min: [0, "Price cannot be negative"]
    },
    category: {
        type: String,
        required: [true, "Please define a category"],
        enum: ['smartphones', 'laptops', 'accessories'] // Locks down our product lanes
    },
    brand: {
        type: String,
        required: [true, "Please provide the brand manufacturer (e.g., Apple, Samsung, Dell)"]
    },
    images: {
        type: [String], // Array of secure Cloudinary image links
        default: []
    },
    stock: {
        type: Number,
        required: [true, "Please set available inventory count"],
        min: [0, "Stock metrics cannot drop below zero"],
        default: 0
    },

    specifications: {
        type: Map,
        of: String
    },

    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Product', productSchema);