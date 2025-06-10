const express = require('express');
const router = express.Router();
const Post = require('../../../auth/src/models/Post');
const auth = require('../middleware/auth');

router.post('/', auth, async (req, res) => {
  const newPost = new Post({
    author: req.user.id,
    content: req.body.content
  });

  const post = await newPost.save();
  res.json(post);
});

router.get('/user/:userId', async (req, res) => {
  const posts = await Post.find({ author: req.params.userId });
  res.json(posts);
});

router.post('/:postId/like', auth, async (req, res) => {
  const post = await Post.findById(req.params.postId);
  if (!post.likes.includes(req.user.id)) {
    post.likes.push(req.user.id);
    await post.save();
  }
  res.json(post);
});

module.exports = router;
