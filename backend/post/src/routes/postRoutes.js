const express = require('express');
const router = express.Router();
const { createPost, getPost, listPosts } = require('../controllers/postController');

router.post('/', createPost);
router.get('/', listPosts);
router.get('/:id', getPost);

// posts par user & feed
router.get('/user/:userId', getPostsByUser);
router.get('/feed/:userId', getFeed);

// like / unlike / check
router.post('/:id/like',     likePost);
router.delete('/:id/like',   unlikePost);
router.get('/:id/like/:userId', checkLike);

// commentaires
router.post('/:id/comment',    addComment);
router.get('/:id/comments',    getComments);


module.exports = router;
