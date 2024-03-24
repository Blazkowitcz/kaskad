const SubcategoryService = require('../services/subcategory.service');

/**
 * Get all subcategories
 * @param {Request} req 
 * @param {Response} res 
 */
exports.getSubcategories = async (req, res) => {
    const subcategories = await SubcategoryService.getSubcategories();
    res.status(200).json(subcategories);
}

/**
 * Create new subcategory
 * @param {Request} req 
 * @param {Response} res 
 */
exports.createSubcategory = async (req, res) => {
    const subcategory = await SubcategoryService.createSubcategory(req.body);
    res.status(200).json(subcategory);
}