const { Router } = require('express');

const { categoryController } = require('../controllers');
const checkCategoryNameField = require('../middlewares/checkCategoryNameField');
const checkToken = require('../middlewares/checkToken');

const router = Router();

router.get('/', checkToken, categoryController.getAllCategories);
router.post('/', checkToken, checkCategoryNameField, categoryController.createCategory);

module.exports = router;