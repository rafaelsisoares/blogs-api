const generateToken = require('../utils/generateToken');
const { User } = require('../models');

const getToken = async ({ email, password }) => {
    const user = await User.findOne({ where: { email, password } });
    if (!user) {
        const error = new Error('Invalid fields');
        error.status = 400;
        throw error;
    }

    const token = generateToken(user);
    return token;
};

module.exports = {
    getToken,
};