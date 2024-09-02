const db = require('../db/queries');
const helpers = require('./helpers');

async function getAllCounts(req, res){
    const brandCount = await db.countBrands();
    const categoryCount = await db.countCategories();
    const itemCount = await db.countItems();
    res.render('index', { links: helpers.links, brandCount: brandCount, categoryCount: categoryCount, itemCount: itemCount });
}

module.exports = {
    getAllCounts,
}