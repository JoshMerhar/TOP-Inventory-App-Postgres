const db = require('../db/queries');
const helpers = require('./helpers');
const { body, validationResult } = require("express-validator");

async function listAllBrands(req, res) {
    const brands = await db.showBrands();
    res.render('brandList', { links: helpers.links, brands: brands });
}

async function newBrandGet(req, res) {
    res.render('brandForm', { links: helpers.links });
}

const validateBrand = [
    body("brandName").trim()
        .isLength({ min: 1, max: 50 }).withMessage("Brand name must be between 1 and 50 characters long"),
]

const newBrandPost = [
    validateBrand,
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).render('brandForm', {
            links: helpers.links,
            errors: errors.array(),
          });
        }
        const { brandName } = req.body;
        db.addBrand(brandName);
        res.redirect("/brands");
    }
];
 
async function getBrand(req, res) {
    if (isNaN(req.params.id)) {
        return res.render('error');
    }
    const brand = await db.getSingleBrand(req.params.id);
    res.render('brand', { links: helpers.links, brand: brand, error: null });
}

async function brandUpdateGet(req, res) {
    const brand = await db.getBrandInfo(req.params.id);
    res.render('brandUpdate', { links: helpers.links, brand: brand });
}

// Add password protection to updating data - CONTINUE HERE
const brandUpdatePost = [
    validateBrand,
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const brand = await db.getBrandName(req.params.id);
            return res.status(400).render('brandUpdate', {
                links: helpers.links,
                brand: brand,
                errors: errors.array(),
            });
        }
        const { brandName } = req.body;
        db.updateBrand(brandName, req.params.id);
        res.redirect(`/brands/${req.params.id}`);
    }
];

async function brandDeleteGet(req, res) {
    const brand = await db.getBrandInfo(req.params.id);
    res.render('brandDelete', { links: helpers.links, brand: brand, error: null });
}

async function brandDeletePost(req, res) {
    const validPassword = helpers.checkPassword(req.body.password);
    const brand = await db.getSingleBrand(req.params.id);
    if (brand[0].item_id === null && validPassword) {
        await db.deleteBrand(req.params.id);
        res.redirect('/brands');
    } else if (!validPassword) {
        const error = "Invalid password - NOT DELETED";
        res.render('brandDelete', { links: helpers.links, brand: brand, error: error });
    } else if (brand[0].item_id !== null) {
        const error = "Brand must be empty - NOT DELETED";
        res.render('brand', { links: helpers.links, brand: brand, error: error });
    } 
}

module.exports = {
    listAllBrands,
    newBrandGet,
    newBrandPost,
    getBrand,
    brandUpdateGet,
    brandUpdatePost,
    brandDeleteGet,
    brandDeletePost
}