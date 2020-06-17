
const { validationResult } = require('express-validator/check');
const Product = require("../models/product");

exports.getProducts = (req, res) => {
  Product.find(req.query)
    .then(products => {
      res
        .status(200)
        .json(products)
    })
    .catch(err => {
      console.log(err);
      res.send(500);
    });
};
exports.getProduct = (req, res) => {
  const productId = req.params.productId;
  Product.findById(productId)
    .then(product => {
      if (!product) {
        res.send(422);
      }
      res.status(200).json(product);
    })
    .catch(err => {
      res.send(500);
    }
    );
};

exports.createProduct = (req, res) => {

  const images = req.body.images;
  const type = req.body.type;
  const name = req.body.name;
  const price = req.body.price;
  const fabric = req.body.fabric;
  const color = req.body.color;
  const typeOfMaterial = req.body.typeOfMaterial;
  const careTips = req.body.careTips;
  const details = req.body.details;
  const productNumber = req.body.productNumber;
  const sizeAndQuantity = req.body.sizeAndQuantity;
  const product = new Product({
    images: images,
    type: type,
    name: name,
    price: price,
    color: color,
    fabric: fabric,
    typeOfMaterial: typeOfMaterial,
    careTips: careTips,
    details: details,
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
      console.log(err)
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
  Product.findOneAndUpdate({ _id: productId },
   {$set: {
      images: req.body.images,
      type: req.body.type,
      name: req.body.name,
      price: req.body.price,
      fabric: req.body.fabric,
      typeOfMaterial: req.body.typeOfMaterial,
      color: req.body.color,
      careTips: req.body.careTips,
      details: req.body.details,
      productNumber: req.body.productNumber,
      sizeAndQuantity: req.body.sizeAndQuantity,
    }}, { new: true, useFindAndModify: false  })
    .then(updateProduct => {
      if (!updateProduct) {
        return res.send(404);
      }
      return res.json(updateProduct);
    })
    .catch(err => {
      res.send(500);
    });
}
