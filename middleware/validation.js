const { body } = require('express-validator');

const validateProduct = [
  body('name')
    .trim()
    .isLength({ min: 1, max: 255 })
    .withMessage('Name is required and must be less than 255 characters'),
  
  body('sku')
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('SKU is required and must be less than 100 characters'),
  
  body('price')
    .isFloat({ min: 0 })
    .withMessage('Price must be a positive number'),
  
  body('warehouseId')
    .isInt({ min: 1 })
    .withMessage('Valid warehouse ID is required'),
  
  body('initialQuantity')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Initial quantity must be a non-negative integer')
];

module.exports = { validateProduct };