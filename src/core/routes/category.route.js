module.exports = app => {
    const CategoryController = require('../controllers/category.controller');

    app.get('/categories', CategoryController.getCategories);
    app.get('/categories/:category', CategoryController.getCategory)
    app.post('/categories', CategoryController.createCategory);
}