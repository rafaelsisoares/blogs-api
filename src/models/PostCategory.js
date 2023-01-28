module.exports = (sequelize, DataTypes) => {
    const PostCategory = sequelize.define('PostCategory', {
        postId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            foreignKey: true,
        },
        categoryId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            foreignKey: true,
        },
    }, {
        timestamps: false,
        underscored: true,
        tableName: 'posts_categories',
    });

    PostCategory.associate = ({ Category, BlogPost }) => {
        Category.belongsToMany(BlogPost, {
            foreignKey: 'category_id',
            otherKey: 'post_id',
            through: PostCategory,
            as: 'posts',
        })
        BlogPost.belongsToMany(Category, {
            otherKey: 'category_id',
            foreignKey: 'post_id',
            through: PostCategory,
            as: 'categories',
        })
    }
    return PostCategory;
};