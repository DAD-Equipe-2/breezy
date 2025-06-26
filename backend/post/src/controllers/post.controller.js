const Post = require('../models/post.model');

const axios = require('axios');
const USER_SERVICE = 'http://user-service:3000';



exports.createPost = async (req, res) => {
    const author = req.headers['x-user-name'];
    const { content } = req.body;
    const parent = req.params.postId || null;

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


async function getAuthorDetails(usernames) {
    try {
        const resp = await axios.get(`${USER_SERVICE}/batch`, {
            params: { usernames },
            paramsSerializer: (params) => {
                return `usernames=${params.usernames.join(',')}`;
            }
        });
        return resp.data;
    } catch (err) {
        return [];
    }
}


exports.getPost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId).lean();
        if (!post) return res.status(404).json({ message: 'Post not found' });

        // Get author details from user service
        const authorDetails = await getAuthorDetails([post.author]);
        if (authorDetails.length === 0) {
            return res.status(200).json({ ...post, author: null });
        }

        return res.status(200).json({ ...post, author: authorDetails[0] });
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
        const posts = await Post.find({ author: username, parent: null })
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(10)
            .lean();

        if (posts.length === 0) return res.status(404).json({ message: 'No posts found for this user' });

        // Get author details from user service
        const authorDetails = await getAuthorDetails([username]);
        if (authorDetails.length === 0) {
            return res.status(200).json({ posts, author: null });
        }

        return res.status(200).json({ posts, author: authorDetails[0] });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};


exports.getFeed = async (req, res) => {
    const skip = parseInt(req.query.skip) || 0;

    try {
        const resp = await axios.get(`${USER_SERVICE}/${req.headers['x-user-name']}/following`);
        const followings = resp.data.map(u => u.username);
        const feed = await Post.find({ author: { $in: followings }, parent: null })
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(10)
            .lean();
        
        if (feed.length === 0) return res.status(404).json({ message: 'No posts found in the feed' });
        
        // Get author details for each post in the feed
        const authorDetails = await getAuthorDetails(feed.map(post => post.author));
        if (authorDetails.length === 0) {
            return res.status(200).json(feed);
        }

        // Set author details for each post in the feed
        feed.forEach(post => {
            const author = authorDetails.find(u => u.username === post.author);
            if (author) {
                post.author = author;
            }
        });
        return res.status(200).json(feed);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};


exports.getComments = async (req, res) => {
    const postId = req.params.postId;
    const skip = parseInt(req.query.skip) || 0;

    try {
        const comments = await Post.find({ parent: postId })
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(10)
            .lean();
        
        if (comments.length === 0) return res.status(404).json({ message: 'No comments found' });

        // Get author details for each comment
        const authorDetails = await getAuthorDetails(comments.map(comment => comment.author));
        if (authorDetails.length === 0) {
            return res.status(200).json(comments);
        }

        // Set author details for each comment
        comments.forEach(comment => {
            const author = authorDetails.find(u => u.username === comment.author);
            if (author) {
                comment.author = author;
            }
        });
        return res.status(200).json(comments);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};


exports.likePost = async (req, res) => {
    const username = req.headers['x-user-name'];

    try {
        // Check if the user has already liked the post
        const existingPost = await Post.findOne({ _id: req.params.postId, likes: username });
        if (existingPost) return res.status(400).json({ message: 'Post already liked' });

        // If not, add the user to the likes array
        const post = await Post.findByIdAndUpdate(
            req.params.postId,
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
        // Check if the user has already liked the post
        const existingPost = await Post.findOne({ _id: req.params.postId, likes: username });
        if (!existingPost) return res.status(400).json({ message: 'Post not liked yet' });

        const post = await Post.findByIdAndUpdate(
            req.params.postId,
            { $pull: { likes: username } },
            { new: true }
        );
        res.status(200).json(post);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};