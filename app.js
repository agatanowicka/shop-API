const express = require('express');
const bodyParser = require('body-parser');
const productRouters = require("./routers/product");
const userRouters = require("./routers/user");
const orderRouters = require("./routers/order");
const cardMenuRouters = require('./routers/cardMenu');
const mongoose = require('mongoose');
const app = express();
const userIsLogged = require("./middleware/userIsLogged")
const { updateIfCurrentPlugin } = require('mongoose-update-if-current');
require('dotenv').config()

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

const mongoPath = process.env.MONGODB_PATH || 'mongodb://localhost:27017/shop';
mongoose.set('useFindAndModify', false);
mongoose.connect(mongoPath, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
    .then(() => {
        console.log('mongoose conected');
    })
    .catch((err) => {
        console.log(`mongoose connection error ${err}`);
    });
mongoose.plugin(updateIfCurrentPlugin);

app.use(userIsLogged);
app.use('/collection', productRouters);
app.use("/user", userRouters);
app.use("/order", orderRouters);
app.use('/cardMenu', cardMenuRouters);

app.listen(8080);