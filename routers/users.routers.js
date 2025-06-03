const express = require('express');
const router = express.Router();
const userController = require("../controllers/user.controller")
const authmiddleware = require("../utils/auth.middleware")


// Controlador para manejar las operaciones CRUD de usuarios
// Registrar un nuevo usuario
router.post('/',userController.registerUser);
// Obtener todos los usuarios almacenados en la base de datos
// Se utiliza un middleware de autenticación para proteger esta ruta
router.get('/',authmiddleware.authenticateToken,userController.getUsers);
//Realizar el login de un usuario
router.post('/login',userController.loginUser);
// Eliminar un usuario por su ID
router.delete('/:userId',userController.deleteUser);
// Actualizar un usuario por su ID
router.put('/:userId',userController.updateUser);

module.exports=router;
