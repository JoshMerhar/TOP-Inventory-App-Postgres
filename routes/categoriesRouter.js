const { Router } = require('express');
const categoriesRouter = Router();
const categoriesController = require('../controllers/categoriesController');

categoriesRouter.get('/', categoriesController.listAllCategories);

categoriesRouter.get('/new', categoriesController.newCategoryGet);

categoriesRouter.post('/new', categoriesController.newCategoryPost);

categoriesRouter.get('/:id', categoriesController.getCategory);

categoriesRouter.get('/:id/update', categoriesController.categoryUpdateGet);

categoriesRouter.post('/:id/update', categoriesController.categoryUpdatePost);

categoriesRouter.get('/:id/delete', categoriesController.categoryDeleteGet);

categoriesRouter.post('/:id/delete', categoriesController.categoryDeletePost);

module.exports = categoriesRouter;