const mongoose = require('mongoose');
const fs = require('fs');
require('dotenv').config();
const CardMenu = require("../API/models/cardMenu");
const Product = require("../API/models/product");
const User = require('../API/models/user');

const initDatabase_CardsMenu = async () => {
    const rawdata = fs.readFileSync('dataToMongoose/cardsMenu.json');
    const cardsMenu = JSON.parse(rawdata);
    const documents = cardsMenu.map(card => {
        return new CardMenu(card);
    })
    return await CardMenu.insertMany(documents);
}
const initDatabase_Products = async () => {
    const rawdata = fs.readFileSync('dataToMongoose/products.json');
    const products = JSON.parse(rawdata);
    const documents = products.map(product => {
        return new Product(product);
    })
    return await Product.insertMany(documents);
}

const initDatabase_Users = async () => {
    const rawdata = fs.readFileSync('dataToMongoose/users.json');
    const users = JSON.parse(rawdata);
    const documents = users.map(user => {
        return new User(user);
    })
    return await User.insertMany(documents);
}

mongoose.connect(process.env.MONGODB_PATH, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        return (
            initDatabase_CardsMenu(),
            initDatabase_Products(),
            initDatabase_Users()
        )
    })
    .then(() => {
        console.log('database successfully init');
    })
    .catch((err) => {
        console.log(`mongoose error ${err}`);
    });

