const CategoryModel = require('../models/category.model');
const SubcategoryModel = require('../models/subcategory.model');
const slug = require('slug');

/**
 * 
 * @param {CategoryModel} category 
 * @returns 
 */
exports.getSubcategories = async (category) => {
    return await SubcategoryModel.find().select('-__v');
}

/**
 * 
 * @param {Object} data 
 */
exports.createSubcategory = async (data) => {
    let category = await CategoryModel.findOne({ name: data.category });
    let subcategory = category ? await SubcategoryModel.findOne({ name: data.name, category: category._id }) : null;
    if (subcategory === null) {
        subcategory = new SubcategoryModel({
            name: data.name,
            category: data.category,
            slug: slug(data.name),
            icon: data.icon
        });
        await subcategory.save();
    }
    return subcategory;
}