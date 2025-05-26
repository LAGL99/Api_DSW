const express = require('express');
const app = express();
const booksRoutes = require('./routers/books-routers')
const UserRoutes = require('./routers/users.routers')
const mongoConect = require('./utils/mongoConnection')
//const coorse = require ('cors');

const PORT = process.env.PORT|| 3000;

app.listen(PORT,()=>{
    console.log("Server listening on PORT: ",PORT);
});

app.use(express.json());
//app.use(corse);
app.use("/books", booksRoutes)
app.use("/users", UserRoutes)

app.get("/status", (request,response)=>{
    const status = {
        "Status":"Running"
    }
    response.send(status)
});


