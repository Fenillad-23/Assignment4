
const mongoose = require('mongoose');
const schema = mongoose.schema;
const userSchema = new Schema({
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

const User = mongoose.model("user", userSchema);
module.exports = User;
