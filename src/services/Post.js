const Sequelize = require('sequelize');

const { BlogPost, PostCategory, User, Category } = require('../models');
const config = require('../config/config');

const env = process.env.NODE_ENV || 'development';
const sequelize = new Sequelize(config[env]);

const createPost = async ({ title, content, categoryIds, userId }) => {
    const t = await sequelize.transaction();
    
    try {
        const post = await BlogPost.create({ title, content, userId },
            { transaction: t });
            const postCategories = categoryIds.map((id) => ({
                postId: post.dataValues.id,
                categoryId: id,
            }));
        await PostCategory.bulkCreate(postCategories, { transaction: t });
        await t.commit();
        return post;
    } catch (e) {
        await t.rollback();
        console.error(e.message);
        throw e;
    }
};

const getAllPosts = async () => {
    const posts = await BlogPost.findAll({
        include: [
            {
                model: User, as: 'user', attributes: { exclude: 'password' },
            },
            {
                model: Category, as: 'categories', through: { attributes: [] },
            },
        ],
    });

    return posts;
};

const getPostById = async (id) => {
    const post = await BlogPost.findOne({
        where: { id },
        include: [
            {
                model: User, as: 'user', attributes: { exclude: 'password' },
            },
            {
                model: Category, as: 'categories', through: { attributes: [] },
            },
        ], 
    });

    if (!post) {
        const e = new Error('Post does not exist');
        e.statusCode = 404;
        throw e;
    }

    return post;
};

const editPost = async (postId, userId, newContent) => {
    const targetPost = await BlogPost.findOne({ where: { id: postId } });
    const { userId: id } = targetPost;
    if (id !== userId) {
        const e = new Error('Unauthorized user');
        e.statusCode = 401;
        throw e;
    }

    const { title, content } = newContent;
    const [editedPost] = await BlogPost.update({ title, content }, { where: { id: postId } });

    if (editedPost !== 1) {
        const e = new Error('Post does not exist');
        e.statusCode = 404;
        throw e;
    }

    const post = await getPostById(postId);

    return post;
};

module.exports = {
    createPost,
    getAllPosts,
    getPostById,
    editPost,
};