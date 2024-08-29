const { Router } = require('express');
const itemsRouter = Router();

itemsRouter.get('/', (req, res) => {
    res.send('items');
});

module.exports = itemsRouter;