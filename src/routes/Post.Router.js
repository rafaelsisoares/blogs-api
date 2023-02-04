const { Router } = require('express');

const { postController } = require('../controllers');
const checkNewPostFields = require('../middlewares/checkNewPostFields');
const checkEditPostFields = require('../middlewares/checkEditPostFields');
const checkToken = require('../middlewares/checkToken');

const router = Router();

router.post('/', checkToken, checkNewPostFields, postController.createPost);
router.get('/', checkToken, postController.getAllPosts);
router.get('/search', checkToken, postController.getPostsByQuery);
router.get('/:id', checkToken, postController.getPostById);
router.put('/:id', checkToken, checkEditPostFields, postController.editPost);
router.delete('/:id', checkToken, postController.removePost);

module.exports = router;