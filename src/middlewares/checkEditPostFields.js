module.exports = (req, res, next) => {
    const { title, content } = req.body;

    if (!title || !content) {
        const e = new Error('Some required fields are missing');
        e.statusCode = 400;
        return next(e);
    }

    return next();
};