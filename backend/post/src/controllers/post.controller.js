const Post = require('../models/post.model');

const axios = require('axios');
const USER_SVC = process.env.USER_SVC_URL || 'http://user-service:3000/api/v1/user';

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

// Récupérer posts par utilisateur
exports.getPostsByUser = async (req, res) => {
    try {
        const posts = await Post.find({ author: req.params.userId })
            .sort({ createdAt: -1 });
        res.json(posts);
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
};

// Fil d'actualités (posts des follows)
exports.getFeed = async (req, res) => {
    try {
        // récupère la liste 'following' du user
        const resp = await axios.get(`${USER_SVC}/${req.params.userId}/following`);
        const followings = resp.data.map(u => u._id);
        const feed = await Post.find({ author: { $in: followings } })
            .sort({ createdAt: -1 });
        res.json(feed);
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
};

// Like / unlike / check
exports.likePost = async (req, res) => {
    try {
        const post = await Post.findByIdAndUpdate(
            req.params.id,
            { $addToSet: { likes: req.body.userId } },
            { new: true }
        );
        res.json(post);
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
};

exports.unlikePost = async (req, res) => {
    try {
        const post = await Post.findByIdAndUpdate(
            req.params.id,
            { $pull: { likes: req.body.userId } },
            { new: true }
        );
        res.json(post);
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
};

exports.checkLike = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        const liked = post.likes.includes(req.params.userId);
        res.json({ liked });
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
};

// Commentaires
exports.addComment = async (req, res) => {
    try {
        const post = await Post.findByIdAndUpdate(
            req.params.id,
            { $push: { comments: { author: req.body.userId, content: req.body.content } } },
            { new: true }
        );
        res.json(post.comments);
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
};

exports.getComments = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id, 'comments');
        const sorted = post.comments.sort((a, b) => b.createdAt - a.createdAt);
        res.json(sorted);
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
};

