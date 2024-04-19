
const express = require('express');
const router = express.Router();
const Order = require('../models/order');

router.get('/', async (req, res) => {
    try {
        const orders = await Order.find();
        res.json(orders);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
router.get('/api/orders', async (req, res) => {
    try {
        
        const orders = await db.collection('orders').find({}).toArray();
        res.json(orders);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch orders' });
    }
});

router.post('/add', async (req, res) => {
    const order = new Order({
        userId: req.body.userId,
        quantity: req.body.quantity,
        totalPrice: req.body.totalPrice,
        shippingAddress: req.body.shippingAddress,
        status: req.body.status,
        createdAt: req.body.createdAt
    });

    try {
        const newOrder = await order.save();
        res.status(201).json(newOrder);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const deletedOrder = await Order.findByIdAndDelete(id);

        if (!deletedOrder) {
            return res.status(404).json({ message: "Order not found" });
        }

        res.json({ message: "Order deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


router.put('/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const updatedOrder = await Order.findByIdAndUpdate(id, req.body, {
            new: true
        });

        if (!updatedOrder) {
            return res.status(404).json({ message: "Order not found" });
        }

        res.json({ message: "Order updated successfully", updatedOrder });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
