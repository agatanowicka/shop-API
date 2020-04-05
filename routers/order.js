const express = require('express');
const orderControllers= require("../controllers/order");
const router =express.Router();

router.get('/', orderControllers.getOrders);

router.post('/', orderControllers.createOrder);

module.exports = router