module.exports = app => {
    const SubcategoryController = require('../controllers/subcategory.controller');

    app.get('/subcategories', SubcategoryController.getSubcategories);

    app.post('/subcategories', SubcategoryController.createSubcategory);
}