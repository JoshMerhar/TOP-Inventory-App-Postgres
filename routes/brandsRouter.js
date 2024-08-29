const { Router } = require('express');
const brandsRouter = Router();

brandsRouter.get('/', (req, res) => {
    res.send('brands');
});

module.exports = brandsRouter;