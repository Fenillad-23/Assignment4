
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    description: {
        type: String,
        required: true
    },
    image: String,
    pricing: {
        type: Number,
        required: true
    },
    shippingCost: Number
});

module.exports = mongoose.model('Product', productSchema);
