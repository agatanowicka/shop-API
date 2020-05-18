const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cardMenuSchema = mongoose.Schema({
    image: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("cardMenu", cardMenuSchema);