const CategoryService = require('../services/category.service');

/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 */
exports.getCategories = async (req, res) => {
    const results = await CategoryService.getCategories();
    res.status(200).json(results);
}

/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 */
exports.getCategory = async (req, res) => {
    console.log(req.params.category);
    const result = await CategoryService.getCategory(req.params.category);
    res.status(200).json(result);
}

/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 */
exports.getSubcategories = async (req, res) => {
    const category = await CategoryService.getCategory(req.params.category);
    const results = await CategoryService.getSubcategories(category);
}

/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 */
exports.createCategory = async (req, res) => {
    const category = await CategoryService.createCategory(req.body);
    res.status(200).json(category);
}