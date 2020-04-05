const { validationResult } = require('express-validator/check');
const Order = require("../models/orders");
const User = require("../models/user");
const Product = require("../models/product");

exports.getOrders = (req, res) => {
    User
        .findById(req.userId)
        .populate({
            path: 'orders',
            model: 'order',
            populate: {
                path: 'products.productId',
                model: 'product',
            }
        })
        .then(result => {
            const completeOrders = [];
            const completeOrderProducts = [];
            for (let i = 0; i < result.orders.length; i++) {
                const order = result.orders[i];
                for (let j = 0; j < order.products.length; j++) {
                    const orderedProduct = order.products[j];
                    completeOrderProducts.push({ name: orderedProduct.productId.name, size: orderedProduct.size, quantity: orderedProduct.quantity })
                }
                completeOrders.push({ products: completeOrderProducts, allPrice: order.allPrice, date: order.date })
            }
            return completeOrders;
        })
        .then(completeOrders => {
            res.status(201).json({
                olders: completeOrders
            });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
        })
};

exports.createOrder = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        error.statusCode = 422;
    }
    const products = req.body.products;
    let allPrice = 0;
    const productsErrors = [];
    const promises = [];
    const availableProducts = [];
    let order;
    for (let i = 0; i < products.length; i++) {
        promises.push(Product.findById(products[i].productId))
    }
    Promise.allSettled(promises)
        .then(foundProducts => {
            for (let i = 0; i < foundProducts.length; i++) {
                const foundProduct = foundProducts[i];
                if (foundProduct.value !== null) {
                    for (let j = 0; j < foundProduct.value.sizeAndQuantity.length; j++) {
                        if (foundProduct.value.sizeAndQuantity[j].size === products[i].size
                            && products[i].quantity <= foundProduct.value.sizeAndQuantity[j].quantity
                        ) {
                            availableProducts.push(products[i]);
                            allPrice = allPrice + products[i].quantity * foundProduct.value.price;
                            foundProduct.value.sizeAndQuantity[j].quantity = foundProduct.value.sizeAndQuantity[j].quantity - products[i].quantity;
                            foundProduct.value.save();
                            break;
                        }
                        if (products[i].quantity > foundProduct.value.sizeAndQuantity[j].quantity) {
                            productsErrors.push({ productName: foundProduct.value.name, message: 'wrong Quantity' });
                        }
                    }
                }
            }
            return [allPrice, availableProducts];
        })
        .then(([allPrice, availableProducts]) => {
            order = new Order({
                products: availableProducts,
                allPrice: allPrice,
            })
            return Promise.all([order.save(), User.findById(req.userId)])
        })
        .then(([savedOrder, foundUser]) => {
            foundUser.orders.push(savedOrder._id);
            return foundUser.save();
        })
        .then(result => {
            res.status(201).json({
                foundUser: result
            });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
        })
}
