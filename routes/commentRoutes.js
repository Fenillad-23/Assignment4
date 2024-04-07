// commentRoutes.js
const express = require('express');
const router = express.Router();
const Comment = require('../models/comment');


router.get('/', async (req, res) => {
    try {
        const comments = await Comment.find();
        res.json(comments);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST a new comment
router.post('/add', async (req, res) => {
    const comment = new Comment({
        productId: req.body.productId,
        userId: req.body.userId,
        rating: req.body.rating,
        images: req.body.images,
        text: req.body.text
    });

    try {
        const newComment = await comment.save();
        res.status(201).json(newComment);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE a comment
router.delete('/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const deletedComment = await Comment.findByIdAndDelete(id);

        if (!deletedComment) {
            return res.status(404).json({ message: "Comment not found" });
        }

        res.json({ message: "Comment deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// PUT/update a comment
router.put('/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const updatedComment = await Comment.findByIdAndUpdate(id, req.body, {
            new: true
        });

        if (!updatedComment) {
            return res.status(404).json({ message: "Comment not found" });
        }

        res.json({ message: "Comment updated successfully", updatedComment });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
