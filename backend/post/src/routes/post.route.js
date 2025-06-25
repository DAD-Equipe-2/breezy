const express               = require('express');
const postController        = require('../controllers/post.controller');
const { requireBodyParams } = require('../middlewares/params.middleware');


const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Posts
 *     description: Core post endpoints
 *   - name: User
 *     description: User-scoped post endpoints
 *   - name: Likes
 *     description: Like endpoints for posts
 *   - name: Comments
 *     description: Comment and reply endpoints for posts
 *   - name: 🔒 Internal
 *     description: Internal endpoints for user service
*/

/**
 * @swagger
 * /me:
 *   get:
 *     summary: Get all posts by the authenticated user
 *     tags: [User]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       '200':
 *         description: Posts retrieved successfully
 *       '500':
 *         description: Internal server error
 */
router.get('/me', postController.getPostsByUser);

/**
 * @swagger
 * /user/{username}:
 *   get:
 *     summary: Get all posts by a specific user
 *     tags: [User]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         description: The username of the user to retrieve posts for
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Posts retrieved successfully
 *       '404':
 *         description: User not found
 *       '500':
 *         description: Internal server error
*/
router.get('/user/:username', postController.getPostsByUser);

/**
 * @swagger
 * /feed:
 *   get:
 *     summary: Get posts from users I follow
 *     tags: [User]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       '200':
 *         description: Posts retrieved successfully
 *       '404':
 *         description: No posts found
 *       '500':
 *         description: Internal server error
*/
router.get('/feed', postController.getFeed);


/**
 * @swagger
 * /{postId}/like:
 *   post:
 *     summary: Like a post
 *     tags: [Likes]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         description: The ID of the post to like
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Post liked successfully
 *       '404':
 *         description: Post not found
 *       '500':
 *         description: Internal server error
 */
router.post('/:postId/like', postController.likePost);

/**
 * @swagger
 * /{postId}/like:
 *   delete:
 *     summary: Unlike a post
 *     tags: [Likes]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         description: The ID of the post to unlike
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Post unliked successfully
 *       '404':
 *         description: Post not found
 *       '500':
 *         description: Internal server error
 */
router.delete('/:postId/like', postController.unlikePost);


/**
 * @swagger
 * /{postId}/comments:
 *   post:
 *     summary: Add a comment to a post
 *     tags: [Comments]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         description: The ID of the post to add a comment to
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - content
 *             properties:
 *               content:
 *                 type: string
 *                 description: The content of the comment
 *     responses:
 *       '201':
 *         description: Comment created successfully
 *       '400':
 *         description: Bad request, content is required
 *       '404':
 *         description: Post not found
 *       '500':
 *         description: Internal server error
 */
router.post('/:postId/comments', requireBodyParams('content'), postController.createPost);

/**
 * @swagger
 * /{postId}/comments:
 *  get:
 *    summary: Get all comments for a post
 *    tags: [Comments]
 *    security:
 *      - cookieAuth: []
 *    parameters:
 *      - in: path
 *        name: postId
 *        required: true
 *        description: The ID of the post to retrieve comments for
 *        schema:
 *          type: string
 *    responses:
 *      '200':
 *        description: Comments retrieved successfully
 *      '404':
 *        description: Post not found
 *      '500':
 *        description: Internal server error
 */
router.get('/:postId/comments', postController.getComments);


/**
 * @swagger
 * /:
 *   post:
 *     summary: Create a new post
 *     tags: [Posts]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - content
 *             properties:
 *               content:
 *                 type: string
 *                 description: The content of the post (max 280 characters)
 *               parent:
 *                 type: string
 *                 description: The ID of the parent post if this is a reply
 *     responses:
 *       '201':
 *         description: Post created successfully
 *       '400':
 *         description: Bad request, content is required or exceeds 280 characters
 *       '500':
 *         description: Internal server error
*/
router.post('/', requireBodyParams('content'), postController.createPost);

/**
 * @swagger
 * /{postId}:
 *   get:
 *     summary: Get a post by ID
 *     tags: [Posts]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         description: The ID of the post to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Post retrieved successfully
 *       '404':
 *         description: Post not found
 *       '500':
 *         description: Internal server error
*/
router.get('/:postId', postController.getPost);

/**
 * @swagger
 * /{postId}:
 *   patch:
 *     summary: Update a post by ID
 *     tags: [Posts]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         description: The ID of the post to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - content
 *             properties:
 *               content:
 *                 type: string
 *                 description: The new content of the post (max 280 characters)
 *     responses:
 *       '200':
 *         description: Post updated successfully
 *       '400':
 *         description: Bad request, content is required or exceeds 280 characters
 *       '404':
 *         description: Post not found
 *       '500':
 *         description: Internal server error
*/
router.patch('/:postId', requireBodyParams('content'), postController.updatePost);

/**
 * @swagger
 * /{postId}:
 *   delete:
 *     summary: Delete a post by ID
 *     tags: [Posts]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         description: The ID of the post to delete
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Post deleted successfully
 *       '404':
 *         description: Post not found
 *       '500':
 *         description: Internal server error
*/
router.delete('/:postId', postController.deletePost);


module.exports = router;