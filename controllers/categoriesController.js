const db = require('../db/queries');
const helpers = require('./helpers');
const { body, validationResult } = require("express-validator");

async function listAllCategories(req, res) {
    const categories = await db.showCategories();
    res.render('categoryList', { links: helpers.links, categories: categories });
}

async function newCategoryGet(req, res) {
    res.render('categoryForm', { links: helpers.links });
}

const validateCategory = [
    body("categoryName").trim()
        .isLength({ min: 1, max: 50 }).withMessage("Category name must be between 1 and 50 characters long"),
    body("categoryDescription").trim()
        .isLength({ min: 1, max: 200 }).withMessage("Description must be between 1 and 200 characters long"),
];

const newCategoryPost = [
    validateCategory,
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).render('categoryForm', {
            links: helpers.links,
            errors: errors.array(),
          });
        }
        const { categoryName, categoryDescription } = req.body;
        const newCategory = {
            category_name: categoryName,
            category_description: categoryDescription
        }
        db.addCategory(newCategory);
        res.redirect("/categories");
    }
];

async function getCategory(req, res) {
    if (isNaN(req.params.id)) {
        return res.render('error');
    }
    const category = await db.getSingleCategory(req.params.id);
    if (category[0].item_id !== null) {
        const categoryItems = await db.getCategoryItems(req.params.id);
        return res.render('category', { links: helpers.links, category: categoryItems });
    }
    res.render('category', { links: helpers.links, category: category });
}

async function categoryUpdateGet(req, res) {
    const category = await db.getCategoryInfo(req.params.id);
    res.render('categoryUpdate', { links: helpers.links, category: category });
}

const categoryUpdatePost = [
    validateCategory,
    async (req, res) => {
        const validPassword = helpers.checkPassword(req.body.password);
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          const category = await db.getCategoryInfo(req.params.id);
          return res.status(400).render('categoryUpdate', {
            links: helpers.links,
            category: category,
            errors: errors.array(),
          });
        } else if (!validPassword) {
            const error = { msg: "Invalid password - NOT UPDATED" };
            const category = await db.getCategoryInfo(req.params.id);
            return res.status(400).render('categoryUpdate', {
                links: helpers.links,
                category: category,
                errors: [error],
            });
        }
        const { categoryName, categoryDescription } = req.body;
        db.updateCategory(categoryName, categoryDescription, req.params.id);
        res.redirect(`/categories/${req.params.id}`);
    }
];

async function categoryDeleteGet(req, res) {
    const category = await db.getCategoryInfo(req.params.id);
    res.render('categoryDelete', { links: helpers.links, category: category });
}

async function categoryDeletePost(req, res) {
    const validPassword = helpers.checkPassword(req.body.password);
    const category = await db.getSingleCategory(req.params.id);
    if (category[0].item_id === null && validPassword) {
        await db.deleteCategory(req.params.id);
        res.redirect('/categories');
    } else if (!validPassword) {
        const error = { msg: "Invalid password - NOT DELETED" };
        res.render('categoryDelete', { links: helpers.links, category: category, errors: [error] });
    } else if (category[0].item_id !== null) {
        const error = { msg: "Category must be empty - NOT DELETED" };
        res.render('category', { links: helpers.links, category: category, errors: [error] });
    }
}

module.exports = {
    listAllCategories,
    newCategoryGet,
    newCategoryPost,
    getCategory,
    categoryUpdateGet,
    categoryUpdatePost,
    categoryDeleteGet,
    categoryDeletePost
}