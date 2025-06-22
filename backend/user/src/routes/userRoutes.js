const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/', userController.createUser);
router.get('/:id', userController.getUser);

// Follow / unfollow
router.post  ('/:id/follow',   require('../controllers/userController').followUser);
router.delete('/:id/unfollow', require('../controllers/userController').unfollowUser);

// Liste followers / following
router.get('/:id/followers', require('../controllers/userController').getFollowers);
router.get('/:id/following', require('../controllers/userController').getFollowing);

module.exports = router;
