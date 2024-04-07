
const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    products: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        },
        quantity: {
            type: Number,
            default: 1,
            validate: {
                validator: function (value) {
                    return value > 0;
                },
                message: 'Quantity must be a positive number'
            }
        }
    }],
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

module.exports = mongoose.model('Cart', cartSchema);
