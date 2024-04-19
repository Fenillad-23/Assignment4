
const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/:id', async (req, res) => {
    const userId = req.params.id;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/add', async (req, res) => {
    const user = new User({
        email: req.body.email,
        password: req.body.password,
        username: req.body.username,
        purchaseHistory: req.body.purchaseHistory,
        shippingAddress: req.body.shippingAddress,
        cartProducts: req.body.cartProducts,
    });

    try {
        const newUser = await user.save();
        res.status(201).json(newUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const deletedUser = await User.findByIdAndDelete(id);

        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json({ message: "User deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.put('/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const updatedUser = await User.findByIdAndUpdate(id, req.body, {
            new: true
        });

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json({ statusCode: 200, message: "User updated successfully", updatedUser });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (user.password !== password) {
            return res.status(404).json({ message: "Password Not Match." });
        }
        const userInfo = {
            _id: user._id,
            email: user.email,
            username: user.username,
            purchaseHistory: user.purchaseHistory,
            shippingAddress: user.shippingAddress,
            createdAt: user.createdAt
        };

        res.json(userInfo);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
