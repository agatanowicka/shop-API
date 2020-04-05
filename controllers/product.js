
const { validationResult } = require('express-validator/check');
const Product = require("../models/product");

exports.getProducts = (req, res) => {
    Product.find()
        .then(products => {
            res
                .status(200)
                .json( products )
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            res.send(500);
        });
};
exports.getProduct = (req, res) => {
    const productId = req.params.productId;
    Product.findById(productId)
      .then(product => {
        if (!product) {
          const error = new Error('Could not find product.');
          error.statusCode = 404;
          throw error;
        }
        res.status(200).json(product);
      })
      .catch(err => {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
      });
  };

exports.createProduct = (req, res) => {
    const errors = validationResult(req);
  if (!errors.isEmpty()) {
    error.statusCode = 422;
  }
    const type = req.body.type;
    const name = req.body.name;
    const price = req.body.price;
    const fabric = req.body.fabric;
    const typeOfMaterial = req.body.typeOfMaterial;
    const careTips = req.body.careTips;
    const detail = req.body.detail;
    const productNumber = req.body.productNumber;
    const sizeAndQuantity=req.body.sizeAndQuantity;
    const product = new Product({
        type: type,
        name: name,
        price: price,
        fabric: fabric,
        typeOfMaterial: typeOfMaterial,
        careTips: careTips,
        detail: detail,
        productNumber: productNumber,
        sizeAndQuantity:sizeAndQuantity
    })
    product
        .save()
        .then(result => {
            res.status(201).json({
                product: result
            });
        })
        .catch(err => {
            if (!err.statusCode) {
              err.statusCode = 500;
            }
          });
};
