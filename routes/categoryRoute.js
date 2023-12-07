const express = require('express');
const CategoryController = require('../controllers/categoryController');

const router = express.Router();

router.get('/', CategoryController.getAllCategory);
router.post('/create', CategoryController.createCategory);
router
  .get('/:id', CategoryController.getCategory)
  .delete('/:id', CategoryController.deleteCategory)
  .patch('/:id', CategoryController.updateCategory);
module.exports = router;
