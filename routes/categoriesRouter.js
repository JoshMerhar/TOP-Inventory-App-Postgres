const { Router } = require('express');
const categoriesRouter = Router();

categoriesRouter.get('/', (req, res) => {
    res.send('categories');
});

module.exports = categoriesRouter;