
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    category: String,
    image: String,
    specifications: String,
    price: {
        type: Number,
        required: true
    },
    rating: Number
});

module.exports = mongoose.model('Product', productSchema);
