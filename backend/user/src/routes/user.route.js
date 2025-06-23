const express               = require('express');
const userController        = require('../controllers/user.controller');
const { requireBodyParams } = require('../middlewares/params.middleware');


const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: User
 *   description: User related endpoints
*/

// Account Management
router.post('/', userController.createUser);









// router.get('/:id', userController.getUser);
// router.put('/:id', userController.updateUser);
// router.delete('/:id', userController.deleteUser);


// // Follow System
// router.post('/:id/follow', userController.followUser);
// router.delete('/:id/follow', userController.unfollowUser);

// router.get('/:id/followers', userController.getFollowers);
// router.get('/:id/following', userController.getFollowing);

// router.get('/:id/is-following/:targetId', userController.isFollowing);


module.exports = router;