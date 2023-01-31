const { userService } = require('../services');

const createUser = async (req, res) => {
    try {
        const token = await userService.createUser(req.body);
        res.status(201).json({ token });
    } catch (err) {
        res.status(err.statusCode).json({ message: err.message });
    }
};

const getAllUsers = async (_req, res) => {
    try {
        const users = await userService.getAllUsers();
        res.status(200).json(users);
    } catch (e) {
        console.error(e.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const getUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await userService.getUserById(id);
        res.status(200).json(user);
    } catch (e) {
        res.status(e.statusCode).json({ message: e.message });
    }
};

const removeUser = async (req, res) => {
    const { id } = req.user;
    try {
        await userService.removeUser(id);
        res.status(204).end();
    } catch (e) {
        res.status(e.statusCode).json({ message: e.message });
    }
};

module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    removeUser,
};