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

module.exports = {
    createPost,
    getAllPosts,
    getPostById,
};