const express               = require('express');
const accountController     = require('../controllers/account.controller');
const followController      = require('../controllers/follow.controller');
const multer                = require('multer');
const { requireBodyParams } = require('../middlewares/params.middleware');


const router = express.Router();
const upload = multer();

/**
 * @swagger
 * tags:
 *   - name: Account
 *     description: Account related endpoints
 *   - name: Follow
 *     description: Follow related endpoints
 *   - name: 🔒 Internal
 *     description: Internal endpoints for user service
*/

/**
* @swagger
* /batch:
*   get:
*     summary: Get users by their usernames
*     tags: [🔒 Internal]
*     security:
*       - cookieAuth: []
*     parameters:
*       - in: query
*         name: usernames
*         required: true
*         description: Comma-separated list of usernames to retrieve
*         schema:
*           type: string
*     responses:
*       200:
*         description: Users retrieved successfully
*       400:
*         description: Bad request, invalid or missing usernames parameter
*       500:
*         description: Internal server error
*/
router.get('/batch', accountController.getUsersByUsernames);

/**
* @swagger
* /:
*   post:
*     summary: Create a new user
*     tags: [🔒 Internal]
*     security:
*       - cookieAuth: []
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               nickname:
*                 type: string
*                 description: The nickname of the user
*             required:
*               - nickname
*     responses:
*       201:
*         description: User created successfully
*       400:
*         description: Bad request, user already exists or missing parameters
*       500:
*         description: Internal server error
*/
router.post('/', accountController.createUser);

/**
 * @swagger
 * /me:
 *   get:
 *     summary: Get the authenticated user's profile
 *     tags: [Account]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: User profile retrieved successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
*/
router.get('/me', accountController.getUser);

/**
* @swagger
* /me:
*   patch:
*     summary: Update the authenticated user's profile
*     tags: [Account]
*     security:
*       - cookieAuth: []
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               nickname:
*                 type: string
*               bio:
*                 type: string
*     responses:
*       200:
*         description: User profile updated successfully
*       404:
*         description: User not found
*       500:
*         description: Internal server error
*/
router.patch('/me', accountController.updateProfile);


// router.delete('/me', accountController.deleteProfile);


/**
* @swagger
* /me/avatar:
*   get:
*     summary: Get the authenticated user's avatar
*     tags: [Account]
*     security:
*       - cookieAuth: []
*     responses:
*       200:
*         description: User avatar retrieved successfully
*       404:
*         description: Avatar not found
*       500:
*         description: Internal server error
*/
router.get('/me/avatar', accountController.getAvatar);

/**
* @swagger
* /me/avatar:
*   patch:
*     summary: Update the authenticated user's avatar
*     tags: [Account]
*     security:
*       - cookieAuth: []
*     requestBody:
*       required: true
*       content:
*         multipart/form-data:
*           schema:
*             type: object
*             properties:
*               avatar:
*                 type: string
*                 format: binary
*     responses:
*       200:
*         description: Avatar uploaded successfully
*       400:
*         description: Bad request, no avatar file provided
*       404:
*         description: User not found
*       500:
*         description: Internal server error
*/
router.patch('/me/avatar', upload.single('avatar'), accountController.updateAvatar);

/**
* @swagger
* /me/followers:
*   get:
*     summary: Get the authenticated user's followers
*     tags: [Follow]
*     security:
*       - cookieAuth: []
*     responses:
*       200:
*         description: Followers retrieved successfully
*       404:
*         description: User not found
*       500:
*         description: Internal server error
*/
router.get('/me/followers', followController.getFollowers);

/**
 * @swagger
 * /me/following:
 *   get:
 *     summary: Get the authenticated user's following
 *     tags: [Follow]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Following retrieved successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
*/
router.get('/me/following', followController.getFollowing);

/**
 * @swagger
 * /me/is-following/{targetUsername}:
 *   get:
 *     summary: Check if the authenticated user is following a specific user
 *     tags: [Follow]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: targetUsername
 *         required: true
 *         description: The username of the user to check
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Following status retrieved successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
*/
router.get('/me/is-following/:username', followController.isFollowing);

/**
 * @swagger
 * /{username}:
 *   get:
 *     summary: Get a user's profile by username
 *     tags: [Account]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         description: The username of the user to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User profile retrieved successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error 
*/
router.get('/:username', accountController.getUser);

/**
 * @swagger
 * /{username}/avatar:
 *   get:
 *     summary: Get a user's avatar by username
 *     tags: [Account]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         description: The username of the user whose avatar to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User avatar retrieved successfully
 *       404:
 *         description: Avatar not found
 *       500:
 *         description: Internal server error  
*/
router.get('/:username/avatar', accountController.getAvatar);

/**
 * @swagger
 * /{username}/follow:
 *   post:
 *     summary: Follow a user
 *     tags: [Follow]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         description: The username of the user to follow
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Followed successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
*/
router.post('/:username/follow', followController.followUser);

/**
* @swagger
* /{username}/follow:
*   delete:
*     summary: Unfollow a user
*     tags: [Follow]
*     security:
*       - cookieAuth: []
*     parameters:
*       - in: path
*         name: username
*         required: true
*         description: The username of the user to unfollow
*         schema:
*           type: string
*     responses:
*       200:
*         description: Unfollowed successfully
*       400:
*         description: Bad request, cannot unfollow yourself
*       404:
*         description: User not found
*       500:
*         description: Internal server error 
*/
router.delete('/:username/follow', followController.unfollowUser);

/**
* @swagger
* /{username}/followers:
*   get:
*     summary: Get a user's followers
*     tags: [Follow]
*     security:
*       - cookieAuth: []
*     parameters:
*       - in: path
*         name: username
*         required: true
*         description: The username of the user whose followers to retrieve
*         schema:
*           type: string
*     responses:
*       200:
*         description: Followers retrieved successfully
*       404:
*         description: User not found
*       500:
*         description: Internal server error  
*/
router.get('/:username/followers', followController.getFollowers);

/**
 * @swagger
 * /{username}/following:
 *   get:
 *     summary: Get a user's following
 *     tags: [Follow]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         description: The username of the user whose following to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Following retrieved successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error  
*/
router.get('/:username/following', followController.getFollowing);

/* GET /api/v1/users/search?query=<texte> */
router.get('/search', accountController.searchUsers);

module.exports = router;