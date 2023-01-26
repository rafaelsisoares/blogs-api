const { Router } = require('express');

const { loginController } = require('../controllers');
const checkLoginFields = require('../middlewares/checkLoginFields');

const router = Router();

router.post('/', checkLoginFields, loginController.getToken);

module.exports = router;