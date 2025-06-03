const mongoose = require('mongoose');
await mongoose.connect(process.env.MONGODB_URL||"mongodb+srv://luangomezlo:cRbT07jnmolwp1eI@cluster0.q4oan.mongodb.net/Tienda")
.then(()=> console.log("Mongo DB connected"))
.catch(err => console.error("Mongo DB connecioon ERROR ", err))