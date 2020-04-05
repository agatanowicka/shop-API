const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = mongoose.Schema({
    
    type: String,
    images: Array,
    name: String,
    color: String,
    price: Number,
    fabric: String,
    typeOfMaterial: String,
    careTips: String,
    details: String,
    productNumber: String,
    sizeAndQuantity:[{size:String, quantity:Number}]
});

module.exports = mongoose.model("product", productSchema);