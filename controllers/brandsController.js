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
    const brand = await db.getSingleBrand(req.params.id);
    res.render('brand', { links: helpers.links, brand: brand });
}

async function brandUpdateGet(req, res) {
    res.send('brand update form');
}

async function brandUpdatePost(req, res) {
    res.send('post form data');
}

async function brandDelete(req, res) {
    res.send('delete brand');
}

module.exports = {
    listAllBrands,
    newBrandGet,
    newBrandPost,
    getBrand,
    brandUpdateGet,
    brandUpdatePost,
    brandDelete
}