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

const getPostById = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await postService.getPostById(id);
    res.status(200).json(post);
  } catch (e) {
    res.status(e.statusCode).json({ message: e.message });
  }
};

const editPost = async (req, res) => {
  const { id } = req.params;
  try {
    const editedPost = await postService.editPost(id, req.user.id, req.body);
    res.status(200).json(editedPost);
  } catch (e) {
    res.status(e.statusCode).json({ message: e.message });
  }
};

const removePost = async (req, res) => {
  const { id } = req.params;
  try {
    await postService.removePost(id, req.user.id);
    res.status(204).end();
  } catch (e) {
    res.status(e.statusCode || 500).json({ message: e.message });
  }
};

const getPostsByQuery = async (req, res) => {
  const { q } = req.query;
  try {
    const posts = await postService.getPostsByQuery(q);
    res.status(200).json(posts);
  } catch (e) {
    res.status(e.statusCode || 500).json({ message: e.message });
  }
};

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  editPost,
  removePost,
  getPostsByQuery,
};
