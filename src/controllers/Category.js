const { categoryService } = require('../services');

const createCategory = async (req, res) => {
    const { name } = req.body;
    try {
        const newCategory = await categoryService.createCategory(name);
        res.status(201).json(newCategory);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = {
    createCategory,
};