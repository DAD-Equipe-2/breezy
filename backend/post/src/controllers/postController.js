const Post = require('../models/Post');

// Créer un post
exports.createPost = async (req, res) => {
    try {
        const post = await Post.create({ author: req.body.author, content: req.body.content });
        res.status(201).json(post);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Récupérer un post par ID
exports.getPost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id).populate('author', 'username avatar');
        if (!post) return res.status(404).json({ error: 'Post not found' });
        res.json(post);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Lister tous les posts (chronologique inverse)
exports.listPosts = async (req, res) => {
    try {
        const posts = await Post.find().sort({ createdAt: -1 }).populate('author', 'username avatar');
        res.json(posts);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
