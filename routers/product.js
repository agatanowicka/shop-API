const express = require('express');
const productControllers = require("../controllers/product");
const router = express.Router();

router.get('/product', productControllers.getProducts);

router.get('/product/:productId', productControllers.getProduct);

router.post('/product', productControllers.createProduct);

router.post('/edit/:productId', productControllers.updateProduct);

router.delete('/product/:productId', productControllers.deleteProduct);

module.exports = router