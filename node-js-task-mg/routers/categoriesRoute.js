const express = require('express');
const router = express.Router();
const { createCategory, getAllCategory, getCategoryById, updateCategoryById, deleteCategoryById } = require('../controllers/categoriesController')
router.route('/create').post(createCategory);
router.route('/all').get(getAllCategory);
router.route('/:id')
    .patch(updateCategoryById)
    .get(getCategoryById)
    .delete(deleteCategoryById);

module.exports = router;
