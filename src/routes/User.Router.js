const { Router } = require('express');

const { userController } = require('../controllers');
const checkToken = require('../middlewares/checkToken');

const router = Router();

router.get('/', checkToken, userController.getAllUsers);
router.get('/:id', checkToken, userController.getUserById);
router.post('/', userController.createUser);
router.delete('/me', checkToken, userController.removeUser);

module.exports = router;