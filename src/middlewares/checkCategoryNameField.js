module.exports = (req, res, next) => {
    const { name } = req.body;
    if (!name) {
        const e = new Error('"name" is required');
        e.statusCode = 400;
        return next(e);
    }

    return next();
};