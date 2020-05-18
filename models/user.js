const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    isAdministrator: Boolean,
    orders: [{ type: Schema.Types.ObjectId, ref: "orders" }]
});

module.exports = mongoose.model("user", userSchema);