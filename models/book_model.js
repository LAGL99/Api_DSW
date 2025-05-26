const mongo = require('mongoose')
let bookSchema = new mongo.Schema({
    titulo :    {type: String},
    autor :     {type: String},
    isbn :      {type: String},
    precio :    {type: Number},
    stock :     {type: Number}, 
    image:      {type: String}
})

module.exports = mongo.model("books", bookSchema)