const express = require('express');
const router = express.Router();
const { createProduct, getAllProducts, getProductById } = require('../controllers/productController');

// Public catalog views (Anyone can browse products)
router.get('/', getAllProducts);
router.get('/:id', getProductById);

// Administrative track (For expanding our inventory)
router.post('/', createProduct);

module.exports = router;