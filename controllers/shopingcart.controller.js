const shopingcart = require('../models/shoppingcart.model');

//Objetivo: Controlador para manejar las operaciones CRUD de compras
// Obtener el historial de compras de un usuario
exports.getHistory = async(req,res)=>{
    try {
        const userId = req.params.userId;
        // Se busca en la base de datos los productos comprados por el usuario
        // Se filtra por el campo 'shop' que indica si es una compra realizada
        const carrito= await shopingcart.find({userId:userId,shop:true});
        // Se devuelve el historial de compras
        return res.status(200).json(
            {
                data:carrito
            }
        )
    } catch (error) {
        console.log(error)
        // Si ocurre un error al consultar el historial de compras, se devuelve un mensaje de error
        return res.status(500).json(
            {
                code : 500,
                message: "Error en la consulta  del historial de compras",
                data:error.message

            }
        )
        
    }
}

// Obtener el carrito de compras de un usuario
exports.getCart = async(req,res)=>{
    try {
        const userId = req.params.userId;
        // Se busca en la base de datos los productos en el carrito de compras del usuario
        // Se filtra por el campo 'shop' que indica si es una compra realizada o no
        // En este caso, se busca por 'shop: false' para obtener los productos que aún no han sido comprados
        const carrito= await shopingcart.find({userId:userId,shop:false});
        return res.status(200).json(
            {
                data:carrito
            }
        )
    } catch (error) {
        // Si ocurre un error al consultar el carrito de compras, se devuelve un mensaje de error
        console.log(error)
        return res.status(500).json(
            {
                code : 500,
                message: "Error en la consulta del carrito de compras",
                data:error.message

            }
        )
        
    }
}

// Crear una nueva orden en el carrito de compras
exports.newOrder= async(req,res)=>{
    const {userId,code,productName,image,category,priceUnit,quantity,shop}= req.body;
    
    const newOrden = new shopingcart({userId,code,productName,image,category,priceUnit,quantity,shop}) 
     
    try {
        // Verificar que el usuario no tenga ya un producto con el mismo código en su carrito y que no haya sido comprado
        const existingOrder = await shopingcart.findOne({userId:userId, code:code, shop:false});
        // Si ya existe una orden con el mismo código, se devuelve un mensaje indicando que el producto ya está en el carrito
        if(existingOrder){
            return res.status(200).json(
                {
                    message: "Producto ya se encuentra registrado en el carrito",
                    data: existingOrder
                }
            )
        }
        await newOrden.save(); 
        // Si la creación de la orden es exitosa, se devuelve un mensaje de éxito
        return res.status(200).json(
            { 
                message: "producto agregado al carrito correctamente",
                data: newOrden

            }
        )
    } catch (error) {
        // Si ocurre un error al crear la orden, se devuelve un mensaje de error
        return res.status(500).json(
            {
                code : 500,
                message: "Error al agregar el producto al carrito",
                data:error.message

            }
        )
        
    }
}

// Actualizar una orden en el carrito de compras
exports.updateOrder = async(req,res)=>{
    try {
        const userId = req.params.userId
        const code = req.body.code;
        const update = req.body;
        // Se busca la orden en el carrito de compras del usuario por su userId y code
        const updatedOrder = await shopingcart.findOneAndUpdate({ userId: userId, code: code }, update, {new: true })
        // Si no se encuentra la orden, se devuelve un mensaje de error
        if(!updatedOrder){
            return res.status(404).json(
                {
                    code : 404,
                    message: "Producto no encontrado con el codigo: " + code,
                    data: null
                }
            )
        }
        // Si la actualización de la orden es exitosa, se devuelve un mensaje de éxito
        return res.status(200).json(
            {
                code : 200,
                message: "Actualizacion correcta del producto en el carrito: "+ code,
                data: updatedOrder
                

            }
        )
    } catch (error) {
        // Si ocurre un error al actualizar la orden, se devuelve un mensaje de error
        return res.status(500).json(
            {
                code : 500,
                message: "Error en la actualizacion del producto en el carrito",
                data:error

            }
        )
        
    }
}

// Comprar un producto en el carrito de compras
exports.buyOrder = async(req,res)=>{
    try {
        const userId = req.params.userId
        const code = req.body.code;
        // Se busca la orden en el carrito de compras del usuario por su userId y code Lo cual indica que el producto ha sido comprado
        // Se actualiza el campo 'shop' a true para indicar que la compra se ha realizado
        const ordenCompra = await shopingcart.findOneAndUpdate({ userId: userId, code: code },{ shop: true },{ new: true })
        // Si no se encuentra la orden, se devuelve un mensaje de error
        if(!ordenCompra){
            return res.status(404).json(
                {
                    code : 404,
                    message: "Producto no encontrado con el codigo: " + code,
                    data: null
                }
            )
        }
        // Si la compra del producto es exitosa, se devuelve un mensaje de éxito
        return res.status(200).json(
            {
                code : 200,
                message: "compra realizada correctamente del producto en el carrito: "+ code,
                data: ordenCompra
            }
        )
    } catch (error) {
        // Si ocurre un error al comprar el producto, se devuelve un mensaje de error
        return res.status(500).json(
            {
                code : 500,
                message: "Error en la compra del producto en el carrito",
                data:error

            }
        )
        
    }
}

//  Eliminar una orden del carrito de compras
exports.deleteOrder = async(req,res)=>{
    try {
        const userId = req.params.userId
        const code = req.body.code;
        // Se busca la orden en el carrito de compras del usuario por su userId y code
        // mientras que el campo 'shop' es false, lo cual indica que el producto no ha sido comprado
        const deletedOrder = await shopingcart.findOneAndDelete({ userId: userId, code: code, shop:false},{ new: true });
        // Si no se encuentra la orden, se devuelve un mensaje de error
        if(!deletedOrder){
            return res.status(404).json(
                {
                    code : 404,
                    message: "Orden no encontrado con el codigo: " + code,
                    data: null
                }
            )
        };

        // Si la eliminación de la orden es exitosa, se devuelve un mensaje de éxito
        return res.status(200).json(
            {
                code : 200,
                message: "Eliminacion correcta de la orden: "+code,
                data: deletedOrder

            }
        )
    } catch (error) {
        // Si ocurre un error al eliminar la orden, se devuelve un mensaje de error
        return res.status(500).json(
            {
                code : 500,
                message: "Error en la eliminacion de la orden",
                data:error.message

            }
        )
        
    }
}
