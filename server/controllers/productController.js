const Product = require('../models/Product');

// ==========================================
// 📥 CREATE A NEW PRODUCT (Admin Only)
// ==========================================
exports.createProduct = async (req, res) => {
    try {
        // Create the product using our flexible specifications map
        const newProduct = new Product(req.body);
        await newProduct.save();
        
        res.status(201).json({
            success: true,
            message: `${newProduct.name} added to AnyGadget catalog successfully!`,
            product: newProduct
        });
    } catch (error) {
        res.status(500).json({ message: "Failed to add product", error: error.message });
    }
};

// ==========================================
// 🔍 GET ALL PRODUCTS (With Optional Filtering)
// ==========================================
exports.getAllProducts = async (req, res) => {
    try {
        const { category, brand } = req.query;
        let queryFilter = {};

        // If the user clicks "Smartphones" or "Laptops" in React, we filter the DB query
        if (category) queryFilter.category = category;
        if (brand) queryFilter.brand = brand;

        const products = await Product.find(queryFilter);
        
        res.status(200).json({
            success: true,
            count: products.length,
            products
        });
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch products", error: error.message });
    }
};

// ==========================================
// 🎯 GET A SINGLE PRODUCT BY ID
// ==========================================
exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "Gadget not found in inventory." });
        }
        
        res.status(200).json({ success: true, product });
    } catch (error) {
        res.status(500).json({ message: "Error retrieving product details", error: error.message });
    }
};