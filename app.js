const express = require('express');
const bodyParser = require('body-parser');
const productRouters= require("./routers/product");
const userRouters=require("./routers/user");
const orderRouters=require("./routers/order");
const mongoose = require('mongoose');
const app = express();
const userIsLogged= require("./middleware/userIsLogged")


app.use(bodyParser.json()); 

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});


mongoose.connect("mongodb://localhost:27017/shop", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('mongoose conected');
    })
    .catch((err) => {
        console.log(`mongoose connection error ${err}`);
    });
app.use(userIsLogged);
app.use('/colection', productRouters);
app.use("/user", userRouters);
app.use("/order", orderRouters);

app.listen(8080);