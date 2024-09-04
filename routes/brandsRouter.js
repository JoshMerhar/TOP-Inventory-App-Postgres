const { Router } = require('express');
const brandsRouter = Router();
const brandsController = require('../controllers/brandsController');

brandsRouter.get('/', brandsController.listAllBrands);

brandsRouter.get('/new', brandsController.newBrandGet);

brandsRouter.post('/new', brandsController.newBrandPost);

brandsRouter.get('/:id', brandsController.getBrand);

brandsRouter.get('/:id/update', brandsController.brandUpdateGet);

brandsRouter.post('/:id/update', brandsController.brandUpdatePost);

brandsRouter.get('/:id/delete', brandsController.brandDeleteGet);

brandsRouter.post('/:id/delete', brandsController.brandDeletePost);

module.exports = brandsRouter;