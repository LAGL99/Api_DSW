const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({

    //Esquema de usuario para el registro de la tienda
    userName: {type: String, required : true},
    email: {type: String, required:true, unique:true},
    password: {type: String, required:true},
    role: {type: String, default: 'cliente'},
    profilePicture: {type: String, default: null},
    phone: {type: String, default: null},
    address: {type: String, default: null},
    dateOfBirth: {type: Date, default: null},
    paymentMethod: {type: String, default: null},
    createdAt: {type: Date, default: Date.now}
});
const User = mongoose.model('Usuarios',userSchema,'Usuarios')
module.exports = User;