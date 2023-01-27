module.exports = (error, _req, res, _next) => {
    if (error.statusCode) {
        return res.status(error.statusCode).json(error.message);
    }

    console.error(error.message);

    return res.status(500).json({ message: 'Internal Server Error' });
};