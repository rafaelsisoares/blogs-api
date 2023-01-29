const Sequelize = require('sequelize');

const { BlogPost, PostCategory } = require('../models');
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

module.exports = {
    createPost,
};