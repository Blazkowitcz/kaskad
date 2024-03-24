const CategoryService = require('../services/category.service');

/**
 * Get all categories
 * @param {Request} req 
 * @param {Response} res 
 */
exports.getCategories = async (req, res) => {
    const results = await CategoryService.getCategories();
    res.status(200).json(results);
}

/**
 * Get category from its ID
 * @param {Request} req 
 * @param {Response} res 
 */
exports.getCategory = async (req, res) => {
    console.log(req.params.category);
    const result = await CategoryService.getCategory(req.params.category);
    res.status(200).json(result);
}

/**
 * Create new category
 * @param {Request} req 
 * @param {Response} res 
 */
exports.createCategory = async (req, res) => {
    const category = await CategoryService.createCategory(req.body);
    res.status(200).json(category);
}