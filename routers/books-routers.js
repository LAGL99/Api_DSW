const express = require('express');
const router = express.Router();
const booksController = require("../controllers/books-controller")


router.get('/',booksController.getBook);
router.get('/:bookId',booksController.getBookById);

router.post('/',booksController.newBook);
router.put('/:bookId',booksController.updateBook);
router.delete('/:bookId',booksController.deleteBook);

module.exports=router;
