const express = require('express');
const router = express.Router();
const User = require('../models/user');
router.get("/user", async (req, res) => {
    try {
        const user = await User.find();
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// created post api
router.post("/add/user", async (req, res) => {
    const user = new User({
        email: req.body.email,
        password: req.body.password,
        username: req.body.username,
        purchaseHistory: req.body.purchaseHistory,
        shippingAddress: req.body.shippingAddress
    });

    try {
        const newUser = await user.save();
        res.status(201).json(newUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});
router.delete("/user/:id", async (req, res) => {
    const id = req.params.id;

    try {
        const deletedUser = await User.findByIdAndDelete(id);

        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json({ message: "user deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// created update api
router.put("/user/:id", async (req, res) => {
    const id = req.params.id;
    const updateUser = {
        email: req.body.email,
        password: req.body.password,
        username: req.body.username,
        purchaseHistory: req.body.purchaseHistory,
        shippingAddress: req.body.shippingAddress
    };

    try {
        const updatedUser = await User.findByIdAndUpdate(id, updateUser, {
            new: true,
        });

        if (!updatedUser) {
            return res.status(404).json({ message: "user not found" });
        }

        res.json({ message: "user updated successfully", updatedUser });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
