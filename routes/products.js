const express = require('express');
const { createProduct, getProducts, getProductById } = require('../controllers/productController');
const { validateProduct } = require('../middleware/validation');

const router = express.Router();

// POST /api/products - Create new product (from case study Part 1)
router.post('/', validateProduct, createProduct);

// GET /api/products - Get all products
router.get('/', getProducts);

// GET /api/products/:id - Get single product
router.get('/:id', getProductById);

module.exports = router;