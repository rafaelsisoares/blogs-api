const { categoryService } = require('../services');

const checkCategoryIds = async (ids) => {
    const categories = await categoryService.getAllCategories();

    for (let i = 0; i < ids.length; i += 1) {
        const isValid = categories.some(({ id }) => id === ids[i]);
        if (!isValid) return isValid;
    }

    return true;
};

module.exports = async (req, res, next) => {
    const { title, content, categoryIds } = req.body;
    if (!title || !content || categoryIds.length === 0) {
        const error = new Error('Some required fields are missing');
        error.statusCode = 400;
        return next(error);
    }

    if (!await checkCategoryIds(categoryIds)) {
        const error = new Error('one or more "categoryIds" not found');
        error.statusCode = 400;
        return next(error);
    }

    return next();
};
