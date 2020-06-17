const express = require('express');
const cardMenuController = require("../controllers/cardMenu");
const router = express.Router();

router.get('/', cardMenuController.getCardMenu);

router.post('/', cardMenuController.createCardMenu);

router.post("/product/:cardMenuId", cardMenuController.updateCardMenu);

router.delete('/product/:cardMenuId', cardMenuController.deleteCardMenu);

module.exports = router