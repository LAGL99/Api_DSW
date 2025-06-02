const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({

    //Esquema de productos para la tienda
    code: {type: String, required:true, unique:true},
    productName: {type: String, required : true},
    description: {type: String, required:true},
    image: {type: String, default: null},
    category: {type: String, required:true},
    priceUnit: {type: String, default: null},
    stock: {type: String, default: null},
    enterprise: {type: String, default: null},
    createdAt: {type: Date, default: Date.now}
});
const Product = mongoose.model('Productos',productSchema,'Productos')
module.exports = Product;