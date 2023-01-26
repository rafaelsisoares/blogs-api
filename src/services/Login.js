const jwt = require('jsonwebtoken');

const { User } = require('../models');

const { JWT_SECRET } = process.env;

const getToken = async ({ email, password }) => {
    const user = await User.findOne({ where: { email, password } });
    if (!user) {
        const error = new Error('Invalid fields');
        error.status = 400;
        throw error;
    }

    const jwtConfig = {
        expiresIn: '1d',
        algorithm: 'HS256',
    };

    const { displayName, id, email: userEmail, image } = user;

    const token = await jwt.sign({ id, displayName, userEmail, image }, JWT_SECRET, jwtConfig);
    return token;
};

module.exports = {
    getToken,
};