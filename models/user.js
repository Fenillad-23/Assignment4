// userModel.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: String,
    password: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true
    },
    purchaseHistory: String,
    shippingAddress: String
});

module.exports = mongoose.model('User', userSchema);
