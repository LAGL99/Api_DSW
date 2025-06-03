const Product = require('../models/product.model');


// Controlador para manejar las operaciones CRUD de productos

// Obtener todos los productos almacenados en la base de datos
exports.getProducts = async(req,res)=>{
    try {
        const productos= await Product.find();
        //Mensaje de respuesta
        return res.status(200).json(
            {
                data:productos
            }
        )
    } catch (error) {
        console.log(error)
        //mensaje de error
        return res.status(500).json(
            {
                code : 500,
                message: "Error en la consulta todos los productos",
                data:error.message

            }
        )
        
    }
}

//obtener un producto por su codigo
exports.getProductByCode = async(req,res)=>{
    const code = req.params.code;
    try {
         const producto= await Product.findOne({code:code});
         // Si no se encuentra el producto, se devuelve un mensaje de error
        if(!producto){
            return res.status(404).json(
                {
                    code : 404,
                    message: "Producto no encontrado con el codigo: " + code,
                    data: null
                }
            )
        }
        // Si se encuentra el producto, se devuelve el producto
         console.log(producto)
        return res.status(200).json(
            {
               data: producto
            }
        )
    } catch (error) {
        // Si ocurre un error al consultar el producto, se devuelve un mensaje de error
        return res.status(500).json(
            {
                code : 500,
                message: "Error en la consulta del producto con codigo" + code,
                data:error.message
            }
        )
        
    }
}


// Crear un nuevo producto
exports.newProduct= async(req,res)=>{
    // Verificar que el cuerpo de la solicitud contenga los campos necesarios
    const {code,productName,description,image,category,priceUnit,stock,enterprise}= req.body;
    
    const newProducto = new Product({code,productName,description,image,category,priceUnit,stock,enterprise}) 
     
    try {
        await newProducto.save(); 
        // Si la creación del producto es exitosa, se devuelve un mensaje de éxito
        return res.status(200).json(
            { 
                message: "Creacion correcta del producto",
                data: newProducto

            }
        )
    } catch (error) {
        // Si ocurre un error al crear el producto, se devuelve un mensaje de error
        return res.status(500).json(
            {
                code : 500,
                message: "Error en la creacion del producto",
                data:error.message

            }
        )
        
    }
}

// Actualizar un producto existente por su codigo
exports.updateProduct = async(req,res)=>{
    try {
        const code = req.params.code
        const update = req.body;
        const updatedProducto = await Product.findOneAndUpdate({code:code}, update, { new: true })
        // Si no se encuentra el producto, se devuelve un mensaje de error
        if(!updatedProducto){
            return res.status(404).json(
                {
                    code : 404,
                    message: "Producto no encontrado con el codigo: " + code,
                    data: null
                }
            )
        }
        // Si la actualización del producto es exitosa, se devuelve un mensaje de éxito
        return res.status(200).json(
            {
                code : 200,
                message: "Actualizacion correcta del producto: "+ code,
                data: updatedProducto
                

            }
        )
    } catch (error) {
        // Si ocurre un error al actualizar el producto, se devuelve un mensaje de error
        return res.status(500).json(
            {
                code : 500,
                message: "Error en la actualizacion del producto",
                data:error

            }
        )
        
    }
}
// Eliminar un producto por su codigo
exports.deleteProduct = async(req,res)=>{
    try {
        const code = req.params.code
        const deletedProducto = await Product.findOneAndDelete({code:code})
        // Si no se encuentra el producto, se devuelve un mensaje de error
        if(!deletedProducto){
            return res.status(404).json(
                {
                    code : 404,
                    message: "Producto no encontrado con el codigo: " + code,
                    data: null
                }
            )
        };
        // Si la eliminación del producto es exitosa, se devuelve un mensaje de éxito
        return res.status(200).json(
            {
                code : 200,
                message: "Eliminacion correcta del producto: "+code,
                data: deletedProducto

            }
        )
    } catch (error) {
        // Si ocurre un error al eliminar el producto, se devuelve un mensaje de error
        return res.status(500).json(
            {
                code : 500,
                message: "Error en la eliminacion del producto",
                data:error.message

            }
        )
        
    }
}
