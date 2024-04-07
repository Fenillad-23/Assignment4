
const express = require('express');
const router = express.Router();
const Cart = require('../models/cart');

router.get('/', async (req, res) => {
    try {
        const carts = await Cart.find();
        res.json(carts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


router.post('/add', async (req, res) => {
    const cart = new Cart({
        products: req.body.products,
        userId: req.body.userId
    });

    try {
        const newCart = await cart.save();
        res.status(201).json(newCart);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


router.delete('/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const deletedCart = await Cart.findByIdAndDelete(id);

        if (!deletedCart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        res.json({ message: "Cart deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.put('/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const updatedCart = await Cart.findByIdAndUpdate(id, req.body, {
            new: true
        });

        if (!updatedCart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        res.json({ message: "Cart updated successfully", updatedCart });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
