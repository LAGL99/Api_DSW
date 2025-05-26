const Book = require('../models/book_model')

exports.getBook = async(req,res)=>{
    try {
        const books= await Book.find();
        return res.status(200).json(
            {
                code : 200,
                message: "consula de libro",
                data:books

            }
        )
    } catch (error) {
        console.log(error)
        return res.status(500).json(
            {
                code : 500,
                message: "Error en la consulta de libro",
                data:error.message

            }
        )
        
    }
}


exports.getBookById = async(req,res)=>{
    const bookid = req.params.bookId;
    try {
        console.log(bookid)
         const book= await Book.findById(bookid);
        return res.status(200).json(
            {
                code : 200,
                message: "consula del libro por id",
                data: book

            }
        )
    } catch (error) {
        return res.status(500).json(
            {
                code : 500,
                message: "Error en la consulta de libro",
                data:error

            }
        )
        
    }
}

exports.newBook = async(req,res)=>{
    
    const {titulo, autor, isbn, genero, precio, stock, image} = req.body;
    
    const newbook = new Book({titulo, autor, isbn, genero, precio, stock, image}) 
     
    try {
        await newbook.save(); 
        return res.status(200).json(
            { 
                code : 200,
                message: "Creacion del libro",
                data: newbook

            }
        )
    } catch (error) {
        return res.status(500).json(
            {
                code : 500,
                message: "Error en la creacion de libro",
                data:error

            }
        )
        
    }
}

exports.updateBook = async(req,res)=>{
    try {
        const bookId = req.params.bookId
        const update = req.body;
        const updatedBook = await Book.findByIdAndUpdate(bookId, update, { new: true })
        return res.status(200).json(
            {
                code : 200,
                message: "Actualizacion del libro por id",
                data: updatedBook
                

            }
        )
    } catch (error) {
        return res.status(500).json(
            {
                code : 500,
                message: "Error en la actualizacion de libro",
                data:error

            }
        )
        
    }
}
exports.deleteBook = async(req,res)=>{
    try {
        const bookId = req.params.bookId
        const deletedBook = await Book.findByIdAndDelete(bookId);

        return res.status(200).json(
            {
                code : 200,
                message: "Eliminacion del libro por id",
                data: deletedBook

            }
        )
    } catch (error) {
        return res.status(500).json(
            {
                code : 500,
                message: "Error en la eliminacion del libro",
                data:error

            }
        )
        
    }
}