const Product = require('../models/product.model');

exports.getProducts = async(req,res)=>{
    try {
        const productos= await Product.find();
        return res.status(200).json(
            {
                data:productos
            }
        )
    } catch (error) {
        console.log(error)
        return res.status(500).json(
            {
                code : 500,
                message: "Error en la consulta todos los productos",
                data:error.message

            }
        )
        
    }
}

exports.getProductByCode = async(req,res)=>{
    const code = req.params.code;
    try {
         const producto= await Product.findOne({code:code});
        if(!producto){
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
               data: producto
            }
        )
    } catch (error) {
        return res.status(500).json(
            {
                code : 500,
                message: "Error en la consulta del producto con codigo" + code,
                data:error.message
            }
        )
        
    }
}



exports.newProduct= async(req,res)=>{
    
    const {code,productName,description,image,category,priceUnit,stock,enterprise}= req.body;
    
    const newProducto = new Product({code,productName,description,image,category,priceUnit,stock,enterprise}) 
     
    try {
        await newProducto.save(); 
        return res.status(200).json(
            { 
                message: "Creacion correcta del producto",
                data: newProducto

            }
        )
    } catch (error) {
        return res.status(500).json(
            {
                code : 500,
                message: "Error en la creacion del producto",
                data:error.message

            }
        )
        
    }
}

exports.updateProduct = async(req,res)=>{
    try {
        const code = req.params.code
        const update = req.body;
        const updatedProducto = await Product.findOneAndUpdate({code:code}, update, { new: true })
        if(!updatedProducto){
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
                message: "Actualizacion correcta del producto: "+ code,
                data: updatedProducto
                

            }
        )
    } catch (error) {
        return res.status(500).json(
            {
                code : 500,
                message: "Error en la actualizacion del producto",
                data:error

            }
        )
        
    }
}
exports.deleteProduct = async(req,res)=>{
    try {
        const code = req.params.code
        const deletedProducto = await Product.findOneAndDelete({code:code})
        if(!deletedProducto){
            return res.status(404).json(
                {
                    code : 404,
                    message: "Producto no encontrado con el codigo: " + code,
                    data: null
                }
            )
        };

        return res.status(200).json(
            {
                code : 200,
                message: "Eliminacion correcta del producto: "+code,
                data: deletedProducto

            }
        )
    } catch (error) {
        return res.status(500).json(
            {
                code : 500,
                message: "Error en la eliminacion del producto",
                data:error.message

            }
        )
        
    }
}
