
// const { validationResult } = require('express-validator/check');
const Product = require("../models/product");

exports.getProducts = (req, res) => {
  Product.find(req.query)
    .then(products => {
      console.log('backend works');
      res
        .status(200)
        .json(products)
    })
    .catch(err => {
      console.log(err);
      // res.send(500);
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
      res.send(500);
    }
    );
};

exports.createProduct = (req, res) => {
  // const errors = validationResult(req);
  // if (!errors.isEmpty()) {
  //   error.statusCode = 422;
  // }
  const images= req.body.images;
  const type = req.body.type;
  const name = req.body.name;
  const price = req.body.price;
  const fabric = req.body.fabric;
  const typeOfMaterial = req.body.typeOfMaterial;
  const careTips = req.body.careTips;
  const detail = req.body.detail;
  const productNumber = req.body.productNumber;
  const sizeAndQuantity = req.body.sizeAndQuantity;
  const product = new Product({
    images:images,
    type: type,
    name: name,
    price: price,
    fabric: fabric,
    typeOfMaterial: typeOfMaterial,
    careTips: careTips,
    detail: detail,
    productNumber: productNumber,
    sizeAndQuantity: sizeAndQuantity
  })
  product
    .save()
    .then(result => {
      res.status(201).json(
        result
      );
    })
    .catch(err => {
      res.send(500);
    });
};

exports.deleteProduct = (req, res) => {
  const productId = req.params.productId;

  Product.findByIdAndRemove(productId)
    .then(deletedProduct => {
      res.send(200);
    })
    .catch(err => {
      res.send(500);
    });
}

exports.updateProduct = (req, res) => {
  const productId = req.params.productId;
  Product.findOneAndUpdate(productId, req.body)
    .then(updateProduct => {
      if (!updateProduct) {
        res.send(404);
      }
      return updateProduct.save();
    })
    .then(result => {
      res.send(200).json(result);
    })
    .catch(err => {
      res.send(500);
    });
}