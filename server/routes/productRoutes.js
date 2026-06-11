const express = require('express');
const router = express.Router();
const { createProduct, getAllProducts, getProductById } = require('../controllers/productController');
const { protect, admin } = require('../middleware/authMiddleware');

// Public catalog views (Anyone can browse products)
router.get('/', getAllProducts);
router.get('/:id', getProductById);

// Administrative track (For expanding our inventory)
router.post('/', protect, admin, createProduct);

module.exports = router;