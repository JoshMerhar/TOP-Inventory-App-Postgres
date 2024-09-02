const { Router } = require('express');
const categoriesRouter = Router();
const categoriesController = require('../controllers/categoriesController');

categoriesRouter.get('/', categoriesController.listAllCategories);

categoriesRouter.get('/new', categoriesController.newCategoryGet);

categoriesRouter.post('/new', categoriesController.newCategoryPost);

categoriesRouter.get('/:id', categoriesController.getCategory);

categoriesRouter.get('/:id/update', categoriesController.categoryUpdateGet);

categoriesRouter.post('/:id/update', categoriesController.categoryUpdatePost);

// Not totally sure how this will work out yet. Come back to this
categoriesRouter.post('/:id/delete', categoriesController.categoryDelete);

module.exports = categoriesRouter;