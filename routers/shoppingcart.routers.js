const express = require('express');
const router = express.Router();
const shoppingController = require("../controllers/shopingcart.controller")


router.get('/history/:userId',shoppingController.getHistory);
router.get('/cart/:userId',shoppingController.getCart);

router.post('/order',shoppingController.newOrder);
router.put('/order/:userId',shoppingController.updateOrder);
router.put('/buy/:userId',shoppingController.buyOrder);
router.delete('/delete/:userId',shoppingController.deleteOrder);

module.exports=router;
