const { Router } = require('express');
const brandsRouter = Router();
const brandsController = require('../controllers/brandsController');

brandsRouter.get('/', brandsController.listAllBrands);

brandsRouter.get('/new', brandsController.newBrandGet);

brandsRouter.post('/new', brandsController.newBrandPost);

brandsRouter.get('/:id', brandsController.getBrand);

brandsRouter.get('/:id/update', brandsController.brandUpdateGet);

brandsRouter.post('/:id/update', brandsController.brandUpdatePost);

// Not totally sure how this will work out yet. Come back to this
brandsRouter.post('/:id/delete', brandsController.brandDelete);

module.exports = brandsRouter;