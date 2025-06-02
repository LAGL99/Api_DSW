const express = require('express');
const router = express.Router();
const productController = require("../controllers/product.controller")


router.get('/',productController.getProducts);
router.get('/:code',productController.getProductByCode);

router.post('/',productController.newProduct);
router.put('/:code',productController.updateProduct);
router.delete('/:code',productController.deleteProduct);

module.exports=router;
