const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;

module.exports = (user) => {
    const { id, displayName, email, image } = user;

    const jwtConfig = {
        expiresIn: '1d',
        algorithm: 'HS256',
    };

    const token = jwt.sign({ id, displayName, email, image }, JWT_SECRET, jwtConfig);
    return token;
};