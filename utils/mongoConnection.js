const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://luangomezlo:cRbT07jnmolwp1eI@cluster0.q4oan.mongodb.net/books')
.then(()=> console.log("Mongo DB connected"))
.catch(err => console.error("Mongo DB connecioon ERROR ", err))