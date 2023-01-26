const { User } = require('../models');
const generateToken = require('../utils/generateToken');

const validateNewUserData = require('./validators/validateNewUserData');

const createUser = async (user) => {
    const { type, message } = await validateNewUserData(user);

    if (type) {
        const error = new Error(message);
        error.statusCode = 400;
        throw error;
    }

    const userFounded = await User.findOne({ where: { email: user.email } });
    if (userFounded) {
        const error = new Error('User already registered');
        error.statusCode = 409;
        throw error;
    }

    await User.create(user);
    const token = generateToken(user);
    return token;
};

module.exports = {
    createUser,
};