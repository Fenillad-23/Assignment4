
const express = require('express');
const router = express.Router();
const Product = require('../models/product');

router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/add', async (req, res) => {
    const product = new Product({
        name: req.body.name,
        category: req.body.category,
        specifications: req.body.specifications,
        price: req.body.price,
        rating: req.body.rating,
    });

    if(req.file) {
        product.image = `http://localhost:5001/${req.file.path}`;
    }

    try {
        const newProduct = await product.save();
        res.status(201).json(newProduct);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const deletedProduct = await Product.findByIdAndDelete(id);

        if (!deletedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.json({ message: "Product deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.put('/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
            new: true
        });

        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.json({ statusCode:200,message: "Product updated successfully", updatedProduct });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
