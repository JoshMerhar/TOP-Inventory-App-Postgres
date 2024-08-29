const pool = require('./pool');

async function countBrands() {
    const brandCount = await pool.query("SELECT COUNT(*) FROM brands");
    return brandCount.rowCount;
}

async function countCategories() {
    const categoryCount = await pool.query("SELECT COUNT(*) FROM categories");
    return categoryCount.rowCount;
}

async function countItems() {
    const itemCount = await pool.query("SELECT COUNT(*) FROM items");
    return itemCount.rowCount;
}

module.exports = {
    countBrands,
    countCategories,
    countItems
}