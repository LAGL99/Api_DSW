const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

exports.registerUser = async(req,res) =>{
    try{
        const {userName, email, password,role,profilePicture,phone,address,dateOfBirth,paymentMethod} = req.body;
        const existingUser = await User.findOne({email});
        if (existingUser){
            return res.status(400).json({error:"El usuario ya existe"});
        }
        const hashedPassword = await bcrypt.hash(password,10);
        const newUser = new User({userName,email,password:hashedPassword,role,profilePicture,phone,address,dateOfBirth,paymentMethod});
        await newUser.save();
        return res.status(201).json({msg:"El usuario registrado exitosamente", data : newUser});
    }catch(error){
        return res.status(500).json({error:"Error al registrar usuario", data: error.message});
    
    }

};

exports.updateUser = async(req,res) =>{
    try{
        const _id = req.params.userId;
        const {userName, email, password,role,profilePicture,phone,address,dateOfBirth,paymentMethod} = req.body;
        const hashedPassword = await bcrypt.hash(password,10);
        const existingUser = await User.findByIdAndUpdate(_id,{userName, email, hashedPassword,role,profilePicture,phone,address,dateOfBirth,paymentMethod});
        if (!existingUser){
            return res.status(400).json({error:"El usuario no existe"});
        }
        const updatedUser = await User.findById(_id);
        return res.status(201).json({msg:"El usuario actualizado exitosamente", data: updatedUser});
    }catch(error){
        return res.status(500).json({error:"Error al actualizar el usuario"});
    
    }

};

exports.deleteUser = async(req,res) =>{
    try{
        const _id = req.params.userId;
        const deleteUser = await User.findByIdAndDelete(_id);
        if (!deleteUser){
            return res.status(400).json({error:"El usuario no existe"});
        }
        return res.status(201).json({msg:"El usuario eliminado exitosamente", data: deleteUser});
    }catch(error){
        return res.status(500).json({error:"Error al eliminar el usuario"});
    
    }

};

exports.getUsers = async (req, res) => {
    try {
        const users = await User.find();
        return res.status(200).json(
            {
                message: 'Usuarios obtenidos con éxito',
                data: users
            }
        );
    } catch (error) {
        return res.status(500).json(
            {
                message: 'Error al consultar usuarios',
                data: error
            }
        );
    }
};

exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        await User.findOne({ email })
            .then(async user => {
                if (!user) {
                    return res.status(401).json({ error: 'Credenciales inválidas' });
                }

                const passwordMatch = await bcrypt.compare(password, user.password);
                if (!passwordMatch) {
                    return res.status(401).json({ error: 'Credenciales inválidas' });
                }
               
                const token = jwt.sign({ userId: user._id, userName: user.userName }, 
                    'secreto', { expiresIn: '8h' });

                let formatUser = {
                    _id: user._id,
                    userName: user.userName,
                    userEmail: user.email
                };

                return res.json({
                    user: formatUser,
                    token: token,
                    action: 'login'
                });
            }).catch(err => {
                return res.status(500).json(
                    {
                        action: 'login',
                        error: error
                    }
                );
            });
    } catch (error) {
        res.status(500).json({ error: 'Error al iniciar sesión' });
    }
};