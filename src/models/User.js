module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        displayName: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'display_name',
        },
        email: DataTypes.STRING,
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        image: DataTypes.STRING,
    }, {
        timestamps: false,
        underscored: true,
        tableName: 'users',
    });

    User.associate = ({ BlogPost }) => {
        User.hasMany(BlogPost, {
            foreignKey: 'userId',
            as: 'posts',
        });
    }

    return User;
};