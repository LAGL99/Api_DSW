const express = require('express');
const router = express.Router();
const userController = require("../controllers/user.controller")
const authmiddleware = require("../utils/auth.middleware")



router.post('/',userController.registerUser);
router.get('/',authmiddleware.authenticateToken,userController.getUsers);
router.post('/login',userController.loginUser);

module.exports=router;
