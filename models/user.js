const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = mongoose.Schema({
    firstName:String,
    lastName: String,
    email:String,
    password:String,
    adress:String,
    orders:[{type: Schema.Types.ObjectId, ref: "orders"}]
});

module.exports = mongoose.model("user", userSchema);