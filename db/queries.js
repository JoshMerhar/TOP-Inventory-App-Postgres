const pool = require('./pool');

// Count queries for index page
async function countBrands() {
    const brandCount = await pool.query("SELECT COUNT(*) FROM brands");
    return brandCount.rows[0].count;
}

async function countCategories() {
    const categoryCount = await pool.query("SELECT COUNT(*) FROM categories");
    return categoryCount.rows[0].count;
}

async function countItems() {
    const itemCount = await pool.query("SELECT COUNT(*) FROM items");
    return itemCount.rows[0].count;
}

// Brand queries
async function showBrands() {
    const { rows } = await pool.query("SELECT * FROM brands");
    return rows;
}

async function getSingleBrand(id) {
    const { rows } = await pool.query(`SELECT * FROM brands 
        LEFT JOIN items ON brands.id = items.brand_id
        WHERE id = $1`, [id]);
    return rows;
}

async function addBrand(brandName) {
    await pool.query("INSERT INTO brands (brand_name) VALUES ($1)", [brandName]);
}

// Category queries
async function showCategories() {
    const { rows } = await pool.query("SELECT * FROM categories");
    return rows;
}

async function getSingleCategory(id) {
    const { rows } = await pool.query(`SELECT * FROM categories
        LEFT JOIN items ON categories.id = items.category_id
        WHERE id = $1`, [id]);
    return rows;
}

async function addCategory(newCategory) {
    const { category_name, category_description } = newCategory;
    await pool.query("INSERT INTO categories (category_name, category_description) VALUES ($1, $2)", [category_name, category_description]);
}

// Item queries
async function showItems() {
    const { rows } = await pool.query("SELECT * FROM items");
    return rows;
}

async function getSingleItem(id) {
    const { rows } = await pool.query(`SELECT * FROM items 
        JOIN brands ON items.brand_id = brands.id
        JOIN categories ON items.category_id = categories.id 
        WHERE item_id = $1`, [id]);
    return rows;
}

async function addItem(newItem) {
    const { item_name, brand_id, item_description, category_id, price, num_in_stock, img_url } = newItem;
    await pool.query(`INSERT INTO items 
        (item_name, brand_id, item_description, category_id, price, num_in_stock, img_url)
        VALUES ($1, $2, $3, $4, $5, $6, $7)`, [item_name, brand_id, item_description, category_id, price, num_in_stock, img_url]);
}

module.exports = {
    countBrands,
    countCategories,
    countItems,
    showBrands,
    getSingleBrand,
    addBrand,
    showCategories,
    getSingleCategory,
    addCategory,
    showItems,
    getSingleItem,
    addItem,
}