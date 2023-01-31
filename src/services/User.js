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

const getAllUsers = async () => {
    const users = await User.findAll();
    const result = users.map(({ id, displayName, email, image }) => ({
        id,
        displayName,
        email,
        image,
    }));
    return result;
};

const getUserById = async (idUser) => {
    const user = await User.findOne({ where: { id: idUser } });
    if (!user) {
        const error = new Error('User does not exist');
        error.statusCode = 404;
        throw error;
    }

    const { id, displayName, email, image } = user;
    return { id, displayName, email, image };
};

const removeUser = async (id) => {
    const affectedRows = await User.destroy({ where: { id } });

    if (affectedRows !== 1) {
        const e = new Error('User does not exist');
        e.statusCode = 404;
        throw e;
    }
};

module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    removeUser,
};