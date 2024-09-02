const { Router } = require('express');
const itemsRouter = Router();
const itemsController = require('../controllers/itemsController');

itemsRouter.get('/', itemsController.listAllItems);

itemsRouter.get('/new', itemsController.newItemGet);

itemsRouter.post('/new', itemsController.newItemPost);

itemsRouter.get('/:id', itemsController.getItem);

itemsRouter.get('/:id/update', itemsController.itemUpdateGet);

itemsRouter.post('/:id/update', itemsController.itemUpdatePost);

// Not totally sure how this will work out yet. Come back to this
itemsRouter.post('/:id/delete', itemsController.itemDelete);

module.exports = itemsRouter;