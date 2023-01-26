const { loginService } = require('../services');

const getToken = async (req, res) => {
    try {
        const token = await loginService.getToken(req.body);
        res.status(200).json({ token });
    } catch (e) {
        console.log(e.message);
        res.status(e.status).json({ message: e.message });
    }
};

module.exports = {
    getToken,
};