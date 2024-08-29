const db = require('../db/queries');

async function showAllCounts(req, res){
    const brandCount = await db.countBrands();
    const categoryCount = await db.countCategories();
    const itemCount = await db.countItems();
    res.render('index', { brandCount: brandCount, categoryCount: categoryCount, itemCount: itemCount });
}

module.exports = {
    showAllCounts,
}