const express = require('express');
const router = express.Router();
const shoppingController = require("../controllers/shopingcart.controller")

// Objetivo: Controlador para manejar las operaciones CRUD de compras
// Obtener el historial de compras de un usuario
router.get('/history/:userId',shoppingController.getHistory);
// Obtener el carrito de compras de un usuario
router.get('/cart/:userId',shoppingController.getCart);
// Crear una nueva orden en el carrito de compras
router.post('/order',shoppingController.newOrder);
// Actualizar una orden en el carrito de compras
router.put('/order/:userId',shoppingController.updateOrder);
// Comprar una orden en el carrito de compras
router.put('/buy/:userId',shoppingController.buyOrder);
// Eliminar una orden en el carrito de compras
router.delete('/delete/:userId',shoppingController.deleteOrder);

module.exports=router;
