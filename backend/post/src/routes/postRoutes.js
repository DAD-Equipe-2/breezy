const express = require('express');
const router = express.Router();
const { createPost, getPost, listPosts } = require('../controllers/postController');

router.post('/', createPost);
router.get('/', listPosts);
router.get('/:id', getPost);

module.exports = router;
