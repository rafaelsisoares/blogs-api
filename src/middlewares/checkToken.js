const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;

module.exports = async (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        const e = new Error('Token not found');
        e.statusCode = 401;
        return next(e);
    }
    try {
        const result = await jwt.verify(authorization, JWT_SECRET);
        if (result) return next();
    } catch (e) {
        e.message = 'Expired or invalid token';
        e.statusCode = 401;
        return next(e);
    }
    
    return next();
};