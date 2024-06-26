const CategoryModel = require('../models/category.model');
const slug = require('slug');

/**
 * 
 */
exports.getCategories = async () => {
    return await CategoryModel.find();
}

/**
 * 
 * @param {String} category 
 * @returns 
 */
exports.getCategory = async (category) => {
    return await CategoryModel.findOne({$or: [{_id: category}, {name: category}]});
}

/**
 * 
 * @param {Object} data 
 */
exports.createCategory = async (data) => {
    let category = await CategoryModel.findOne({name: data.name});
    if(category === null){
        category = new CategoryModel({
            name: data.name,
            slug: slug(data.name),
            icon: data.icon
        });
        await category.save();
    }
    return category;
}

