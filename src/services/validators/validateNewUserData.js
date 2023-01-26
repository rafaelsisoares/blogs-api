const { newUserSchema } = require('./schemas');

module.exports = (newUser) => {
    const { error } = newUserSchema.validate(newUser);

    if (error) return { type: 'BAD_REQUEST', message: error.message };

    return { type: null, message: '' };
};