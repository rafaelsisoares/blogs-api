const { userService } = require('../services');

const createUser = async (req, res) => {
    try {
        const token = await userService.createUser(req.body);
        res.status(201).json({ token });
    } catch (err) {
        res.status(err.statusCode).json({ message: err.message });
    }
};

module.exports = {
    createUser,
};