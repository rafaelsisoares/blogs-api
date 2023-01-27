const { Router } = require('express');

const { userController } = require('../controllers');
const checkToken = require('../middlewares/checkToken');

const router = Router();

router.get('/', checkToken, userController.getAllUsers);
router.post('/', userController.createUser);

module.exports = router;