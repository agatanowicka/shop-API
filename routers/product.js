const express = require('express');
const productControllers= require("../controllers/product");
const router =express.Router();

//GET/product/
router.get('/product', productControllers.getProducts);
router.get('/product/:productId', productControllers.getProduct);

//POST/product/
router.post('/product', productControllers.createProduct);

module.exports = router