const express = require('express');
const router = express.Router();
const productController = require("../controllers/product.controller")


// Controlador para manejar las operaciones CRUD de productos
// Obtener todos los productos almacenados en la base de datos
router.get('/',productController.getProducts);
// Obtener un producto por su código
router.get('/:code',productController.getProductByCode);
// Crear un nuevo producto
router.post('/',productController.newProduct);
// Actualizar un producto por su código
router.put('/:code',productController.updateProduct);
// Eliminar un producto por su código
router.delete('/:code',productController.deleteProduct);

module.exports=router;
