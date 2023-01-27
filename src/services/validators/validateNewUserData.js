const { newUserSchema } = require('./schemas');

module.exports = (newUser) => {
    const { displayName, email, password } = newUser;
    const { error } = newUserSchema.validate({ displayName, email, password });

    if (error) return { type: 'BAD_REQUEST', message: error.message };

    return { type: null, message: '' };
};