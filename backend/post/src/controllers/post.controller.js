const Post = require('../models/post.model');

const axios = require('axios');
const USER_SERVICE = 'http://user-service:3000';



exports.createPost = async (req, res) => {
    const author = req.headers['x-user-name'];
    const { content } = req.body;
    const parent = req.params.parent || null;

    try {
        if (content.length > 280) {
            return res.status(400).json({ message: 'Content must be under 280 characters.' });
        }
        const post = await Post.create({ author, content, parent });

        // If the post is a comment, increment the comments count of the parent post
        if (parent) {
            await Post.findByIdAndUpdate(parent, { $inc: { comments: 1 } });
        }

        return res.status(201).json(post);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


exports.getPost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId)
        if (!post) return res.status(404).json({ message: 'Post not found' });

        // Get author details from user service
        try {
            const resp = await axios.get(`${USER_SERVICE}/batch`, {
                params: { usernames: [post.author] },
                paramsSerializer: (params) => {
                    return `usernames=${params.usernames.join(',')}`;
                }
            });
            return res.status(200).json({ ...post._doc, author: resp.data[0] });
        } catch (err) {
            return res.status(200).json({ ...post._doc, message: 'Failed to fetch author details' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};


exports.updatePost = async (req, res) => {
    const username    = req.headers['x-user-name'];
    const { content } = req.body;

    try {
        if (content.length > 280) {
            return res.status(400).json({ message: 'Content must be under 280 characters.' });
        }
        const post = await Post.findOneAndUpdate(
            { _id: req.params.postId, author: username },
            { content },
            { new: true }
        );
        if (!post) return res.status(404).json({ message: 'Post not found' });
        return res.status(200).json(post);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};


exports.deletePost = async (req, res) => {
    const username = req.headers['x-user-name'];

    try {
        const post = await Post.findOneAndDelete({ _id: req.params.postId, author: username });
        if (!post) return res.status(404).json({ message: 'Post not found' });

        // If the post is a comment, decrement the comments count of the parent post
        if (post.parent) {
            await Post.findByIdAndUpdate(post.parent, { $inc: { comments: -1 } });
        }

        return res.status(200).json({ message: 'Post deleted successfully' });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};


exports.getPostsByUser = async (req, res) => {
    const username = req.params.username || req.headers['x-user-name'];
    const skip     = parseInt(req.query.skip) || 0;

    try {
        const posts = await Post.find({ author: username })
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(10);

        if (posts.length === 0) return res.status(404).json({ message: 'No posts found for this user' });

        // Get author details from user service
        try {
            const resp = await axios.get(`${USER_SERVICE}/batch`, {
                params: { usernames: [username] },
                paramsSerializer: (params) => {
                    return `usernames=${params.usernames.join(',')}`;
                }
            });
            // Post is an array with posts and numbers of posts, I wanna set the author for each post
            return res.status(200).json({ posts, author: resp.data[0] });
        } catch (err) {
            return res.status(200).json({ posts, message: 'Failed to fetch author details' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};


exports.getFeed = async (req, res) => {
    const skip = parseInt(req.query.skip) || 0;

    try {
        const resp = await axios.get(`${USER_SERVICE}/${req.headers['x-user-name']}/following`);
        const followings = resp.data.map(u => u.username);
        const feed = await Post.find({ author: { $in: followings } })
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(10);
        
        if (feed.length === 0) return res.status(404).json({ message: 'No posts found in the feed' });
        
        // Get author details for each post in the feed
        try {
            const resp = await axios.get(`${USER_SERVICE}/batch`, {
                params: { usernames: followings },
                paramsSerializer: (params) => {
                    return `usernames=${params.usernames.join(',')}`;
                }
            });
            // Set author details for each post in the feed
            feed.forEach(post => {
                const author = resp.data.find(u => u.username === post.author);
                if (author) {
                    post.authorDetails = author;
                }
            });
            return res.status(200).json(feed);
        } catch (err) {
            return res.status(200).json({ feed, message: 'Failed to fetch author details' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};


exports.likePost = async (req, res) => {
    const username = req.headers['x-user-name'];

    try {
        const post = await Post.findByIdAndUpdate(
            req.params.id,
            { $addToSet: { likes: username } },
            { new: true }
        );
        res.status(200).json(post);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


exports.unlikePost = async (req, res) => {
    const username = req.headers['x-user-name'];

    try {
        const post = await Post.findByIdAndUpdate(
            req.params.id,
            { $pull: { likes: username } },
            { new: true }
        );
        res.status(200).json(post);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


exports.getComments = async (req, res) => {
    const postId = req.params.postId;
    const skip = parseInt(req.query.skip) || 0;

    try {
        const comments = await Post.find({ parent: postId })
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(10);
        
        if (comments.length === 0) return res.status(404).json({ message: 'No comments found' });
        
        return res.status(200).json(comments);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};