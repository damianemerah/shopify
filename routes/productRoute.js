const express = require('express');
const ProductController = require('../controllers/productController');

const router = express.Router();

router.get('/', ProductController.getAllProduct);
router.post('/add-product', ProductController.createProduct);

module.exports = router;
