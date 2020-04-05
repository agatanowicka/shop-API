const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = mongoose.Schema({
  products: [{
    productId: { type: Schema.Types.ObjectId, ref: "product" },
    size: String,
    quantity: Number,
    price: String
  }],
  allPrice:Number,
  paid: Boolean,
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("order", orderSchema);