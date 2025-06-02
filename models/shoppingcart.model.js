const mongoose = require('mongoose');
const shoppingCartSchema = new mongoose.Schema({

    //Esquema de productos para la tienda
    userId: {type: String, required:true},
    code: {type: String, required:true, unique:true},
    productName: {type: String, required : true},
    image: {type: String, default: null},
    category: {type: String, required:true},
    priceUnit: {type: String, default: null},
    quantity: {type: Number, default: 1},
    shop:{type:Boolean, default: false},
    createdAt: {type: Date, default: Date.now}
});
const ShoppingCart = mongoose.model('Carrito',shoppingCartSchema,'Carrito')
module.exports = ShoppingCart;