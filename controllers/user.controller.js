const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

//crear un usuario
exports.registerUser = async(req,res) =>{
    try{
        const {userName, email, password,role,profilePicture,phone,address,dateOfBirth,paymentMethod} = req.body;
        // Verificar si el usuario ya existe
        const existingUser = await User.findOne({email});
        // Si el usuario ya existe, se devuelve un mensaje de error
        if (existingUser){
            return res.status(400).json({error:"El usuario ya existe"});
        }
        //Encriptar la contraseña antes de guardarla
        const hashedPassword = await bcrypt.hash(password,10);
        const newUser = new User({userName,email,password:hashedPassword,role,profilePicture,phone,address,dateOfBirth,paymentMethod});
        await newUser.save();
        // Devolver una respuesta exitosa
        return res.status(201).json({msg:"El usuario registrado exitosamente", data : newUser});
    }catch(error){
        // Si ocurre un error al registrar el usuario, se devuelve un mensaje de error
        return res.status(500).json({error:"Error al registrar usuario", data: error.message});
    
    }

};

// Actualizar un usuario
exports.updateUser = async(req,res) =>{
    try{
        const _id = req.params.userId;
        const {userName, email, password,role,profilePicture,phone,address,dateOfBirth,paymentMethod} = req.body;
        const hashedPassword = await bcrypt.hash(password,10);
        // Verificar si el usuario existe
        const existingUser = await User.findByIdAndUpdate(_id,{userName, email, hashedPassword,role,profilePicture,phone,address,dateOfBirth,paymentMethod});
        // Si el usuario no existe, se devuelve un mensaje de error
        if (!existingUser){
            return res.status(400).json({error:"El usuario no existe"});
        }
        // Devolver una respuesta exitosa
        const updatedUser = await User.findById(_id);
        return res.status(201).json({msg:"El usuario actualizado exitosamente", data: updatedUser});
    }catch(error){
        // Si ocurre un error al actualizar el usuario, se devuelve un mensaje de error
        return res.status(500).json({error:"Error al actualizar el usuario"});
    
    }

};

// Eliminar un usuario
exports.deleteUser = async(req,res) =>{
    try{
        const _id = req.params.userId;
        const deleteUser = await User.findByIdAndDelete(_id);
        // Verificar si el usuario existe
        if (!deleteUser){
            return res.status(400).json({error:"El usuario no existe"});
        }
        // Devolver una respuesta exitosa
        return res.status(201).json({msg:"El usuario eliminado exitosamente", data: deleteUser});
    }catch(error){
        // Si ocurre un error al eliminar el usuario, se devuelve un mensaje de error
        return res.status(500).json({error:"Error al eliminar el usuario"});
    
    }

};

// Obtener todos los usuarios
exports.getUsers = async (req, res) => {
    try {
        const users = await User.find();
        //Mandar mensaje de respuesta
        return res.status(200).json(
            {
                message: 'Usuarios obtenidos con éxito',
                data: users
            }
        );
    } catch (error) {
        // Si ocurre un error al consultar los usuarios, se devuelve un mensaje de error
        return res.status(500).json(
            {
                message: 'Error al consultar usuarios',
                data: error
            }
        );
    }
};

// Iniciar sesión de usuario
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        // Verificar si el email y la contraseña están presentes
        await User.findOne({ email })
            .then(async user => {
                // Si el usuario no existe, se devuelve un mensaje de error
                if (!user) {
                    return res.status(401).json({ error: 'Credenciales inválidas' });
                }

                // Verificar la contraseña
                const passwordMatch = await bcrypt.compare(password, user.password);
                if (!passwordMatch) {
                    return res.status(401).json({ error: 'Credenciales inválidas' });
                }
                // Si las credenciales son válidas, generar un token JWT
                const token = jwt.sign({ userId: user._id, userName: user.userName }, 
                    'secreto', { expiresIn: '8h' });
                // Formatear la respuesta del usuario
                let formatUser = {
                    _id: user._id,
                    userName: user.userName,
                    userEmail: user.email
                };
                // Devolver la respuesta con el usuario y el token
                return res.json({
                    user: formatUser,
                    token: token,
                    action: 'login'
                });
            }).catch(err => {
                // Si ocurre un error al buscar el usuario, se devuelve un mensaje de error
                return res.status(500).json(
                    {
                        action: 'login',
                        error: error
                    }
                );
            });
    } catch (error) {
        // Si ocurre un error al iniciar sesión, se devuelve un mensaje de error
        res.status(500).json({ error: 'Error al iniciar sesión' });
    }
};