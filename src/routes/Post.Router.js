const { Router } = require('express');

const { postController } = require('../controllers');
const checkNewPostFields = require('../middlewares/checkNewPostFields');
const checkToken = require('../middlewares/checkToken');

const router = Router();

router.post('/', checkToken, checkNewPostFields, postController.createPost);
router.get('/', checkToken, postController.getAllPosts);

module.exports = router;