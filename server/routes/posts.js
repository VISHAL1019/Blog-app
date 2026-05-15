const express = require("express");
const router = express.Router();

const Post = require("../models/Post");


// CREATE POST
router.post("/", async (req, res) => {

    try {

        const { title, content, author } = req.body;

        const newPost = new Post({
            title,
            content,
            author
        });

        await newPost.save();

        res.json({
            message: "Post created successfully",
            newPost
        });

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

});


// GET ALL POSTS
router.get("/", async (req, res) => {

    try {

        const posts = await Post.find().sort({ createdAt: -1 });

        res.json(posts);

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

});


// UPDATE POST
router.put("/:id", async (req, res) => {

    try {

        const updatedPost = await Post.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json(updatedPost);

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

});


// DELETE POST
router.delete("/:id", async (req, res) => {

    try {

        await Post.findByIdAndDelete(req.params.id);

        res.json({
            message: "Post deleted successfully"
        });

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

});

module.exports = router;