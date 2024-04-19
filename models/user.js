
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    contactNo: String,
    purchaseHistory: String,
    shippingAddress: String,
    createdAt: {
        type: Date,
        default: Date.now
    },
    cartProducts: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
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
});

module.exports = mongoose.model('User', userSchema);
