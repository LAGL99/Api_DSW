const shopingcart = require('../models/shoppingcart.model');

exports.getHistory = async(req,res)=>{
    try {
        const userId = req.params.userId;
        const carrito= await shopingcart.find({userId:userId,shop:true});
        return res.status(200).json(
            {
                data:carrito
            }
        )
    } catch (error) {
        console.log(error)
        return res.status(500).json(
            {
                code : 500,
                message: "Error en la consulta  del historial de compras",
                data:error.message

            }
        )
        
    }
}

exports.getCart = async(req,res)=>{
    try {
        const userId = req.params.userId;
        const carrito= await shopingcart.find({userId:userId,shop:false});
        return res.status(200).json(
            {
                data:carrito
            }
        )
    } catch (error) {
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

exports.newOrder= async(req,res)=>{
    const {userId,code,productName,image,category,priceUnit,quantity,shop}= req.body;
    
    const newOrden = new shopingcart({userId,code,productName,image,category,priceUnit,quantity,shop}) 
     
    try {
        const existingOrder = await shopingcart.findOne({userId:userId, code:code, shop:false});
        if(existingOrder){
            return res.status(200).json(
                {
                    message: "Producto ya se encuentra registrado en el carrito",
                    data: existingOrder
                }
            )
        }
        await newOrden.save(); 
        return res.status(200).json(
            { 
                message: "producto agregado al carrito correctamente",
                data: newOrden

            }
        )
    } catch (error) {
        return res.status(500).json(
            {
                code : 500,
                message: "Error al agregar el producto al carrito",
                data:error.message

            }
        )
        
    }
}

exports.updateOrder = async(req,res)=>{
    try {
        const userId = req.params.userId
        const code = req.body.code;
        const update = req.body;
        const updatedOrder = await shopingcart.findOneAndUpdate({ userId: userId, code: code }, update, {new: true })

        if(!updatedOrder){
            return res.status(404).json(
                {
                    code : 404,
                    message: "Producto no encontrado con el codigo: " + code,
                    data: null
                }
            )
        }
        return res.status(200).json(
            {
                code : 200,
                message: "Actualizacion correcta del producto en el carrito: "+ code,
                data: updatedOrder
                

            }
        )
    } catch (error) {
        return res.status(500).json(
            {
                code : 500,
                message: "Error en la actualizacion del producto en el carrito",
                data:error

            }
        )
        
    }
}

exports.buyOrder = async(req,res)=>{
    try {
        const userId = req.params.userId
        const code = req.body.code;
        const ordenCompra = await shopingcart.findOneAndUpdate({ userId: userId, code: code },{ shop: true },{ new: true })

        if(!ordenCompra){
            return res.status(404).json(
                {
                    code : 404,
                    message: "Producto no encontrado con el codigo: " + code,
                    data: null
                }
            )
        }
        return res.status(200).json(
            {
                code : 200,
                message: "compra realizada correctamente del producto en el carrito: "+ code,
                data: ordenCompra
            }
        )
    } catch (error) {
        return res.status(500).json(
            {
                code : 500,
                message: "Error en la compra del producto en el carrito",
                data:error

            }
        )
        
    }
}


exports.deleteOrder = async(req,res)=>{
    try {
        const userId = req.params.userId
        const code = req.body.code;
        const deletedOrder = await shopingcart.findOneAndDelete({ userId: userId, code: code, shop:false},{ new: true });
        if(!deletedOrder){
            return res.status(404).json(
                {
                    code : 404,
                    message: "Orden no encontrado con el codigo: " + code,
                    data: null
                }
            )
        };

        return res.status(200).json(
            {
                code : 200,
                message: "Eliminacion correcta de la orden: "+code,
                data: deletedOrder

            }
        )
    } catch (error) {
        return res.status(500).json(
            {
                code : 500,
                message: "Error en la eliminacion de la orden",
                data:error.message

            }
        )
        
    }
}
