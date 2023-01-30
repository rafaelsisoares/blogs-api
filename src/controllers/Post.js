const { postService } = require('../services');

const createPost = async (req, res) => {
  const { title, content, categoryIds } = req.body;
  const { id } = req.user;
  try {
    const newPost = await postService.createPost({
      title,
      content,
      categoryIds,
      userId: id,
    });
    res.status(201).json(newPost);
  } catch (e) {
    console.error(e.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getAllPosts = async (_req, res) => {
  try {
    const posts = await postService.getAllPosts();
    res.status(200).json(posts);
    } catch (e) {
    console.error(e.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = {
  createPost,
  getAllPosts,
};
