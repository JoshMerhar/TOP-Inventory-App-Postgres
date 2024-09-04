const db = require('../db/queries');
const helpers = require('./helpers');
const { body, validationResult } = require("express-validator");

async function listAllItems(req, res) {
    const items = await db.showItems();
    res.render('itemList', { links: helpers.links, items: items });
}

async function newItemGet(req, res) {
    const brands = await db.showBrands();
    const categories = await db.showCategories();
    res.render('itemForm', { links: helpers.links, brands: brands, categories: categories });
}

const validateItem = [
    body("itemName").trim()
        .isLength({ min: 1, max: 50 }).withMessage("Item name must be between 1 and 50 characters long"),
    body("itemBrand").trim().notEmpty(),
    body("itemDescription").trim()
        .isLength({ min: 1, max: 200 }).withMessage("Description must be between 1 and 200 characters long"),
    body("itemCategory").trim().notEmpty(),
    body("itemPrice").isFloat({ min: 0 }),
    body("itemStockAmt").isInt(),
    body("itemImageURL").optional({ checkFalsy: true }).isURL().withMessage("URL value not valid"),
];

const newItemPost = [
    validateItem,
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const brands = await db.showBrands();
            const categories = await db.showCategories();
            return res.status(400).render('itemForm', { 
                links: helpers.links, 
                brands: brands, 
                categories: categories,
                errors: errors.array()
            });
        }
        const { itemName, itemBrand, itemDescription, itemCategory, itemPrice, itemStockAmt, itemImageURL } = req.body;
        const newItem = {
            item_name: itemName,
            brand_id: itemBrand,
            item_description: itemDescription,
            category_id: itemCategory,
            price: itemPrice,
            num_in_stock: itemStockAmt,
            img_url: itemImageURL
        }
        db.addItem(newItem);
        res.redirect("/items");
    }
]

async function getItem(req, res) {
    const item = await db.getSingleItem(req.params.id);
    res.render('item', { links: helpers.links, item: item });
}

async function itemUpdateGet(req, res) {
    const brands = await db.showBrands();
    const categories = await db.showCategories();
    const item = await db.getSingleItem(req.params.id);
    res.render('updateItem', { links: helpers.links, brands: brands, categories: categories, item: item });
}

const itemUpdatePost = [
    validateItem,
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const brands = await db.showBrands();
            const categories = await db.showCategories();
            const item = db.getSingleItem(req.params.id);
            return res.status(400).render('itemUpdate', { 
                links: helpers.links, 
                brands: brands, 
                categories: categories,
                item: item,
                errors: errors.array()
            });
        }
        const { itemName, itemBrand, itemDescription, itemCategory, itemPrice, itemStockAmt, itemImageURL } = req.body;
        db.updateItem(itemName, itemBrand, itemDescription, itemCategory, itemPrice, itemStockAmt, itemImageURL, req.params.id);
        res.redirect(`/items/${req.params.id}`);
    }
];

async function itemDeleteGet(req, res) {
    const item = await db.getSingleItem(req.params.id);
    res.render('itemDelete', { links: helpers.links, item: item });
}

async function itemDeletePost(req, res) {
    await db.deleteItem(req.params.id);
    res.redirect('/items');
}

module.exports = {
    listAllItems,
    newItemGet,
    newItemPost,
    getItem,
    itemUpdateGet,
    itemUpdatePost,
    itemDeleteGet,
    itemDeletePost
}