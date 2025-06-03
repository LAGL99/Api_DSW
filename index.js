const express = require('express');
const app = express();
const productRoutes = require('./routers/product.routers')
const shoppingRoutes = require('./routers/shoppingcart.routers')
const UserRoutes = require('./routers/users.routers')
const mongoConect = require('./utils/mongoConnection')
const cors = require('cors');

const PORT = process.env.PORT|| 3000;

app.listen(PORT,()=>{
    console.log("Server listening on PORT: ",PORT);
});

app.use(express.json());
app.use(cors());
app.use("/products", productRoutes)
app.use("/shopping", shoppingRoutes)
app.use("/users", UserRoutes)

app.get("/status", (request,response)=>{
    const status = {
        "Status":"Running"
    }
    response.send(status)
});


