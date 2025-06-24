const express               = require('express');
const postController        = require('../controllers/post.controller');
const { requireBodyParams } = require('../middlewares/params.middleware');


const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Posts
 *     description: Posts related endpoints
 *   - name: 🔒 Internal
 *     description: Internal endpoints for user service
*/

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




// router.get('/user/:userId', postController.getPostsByUser);
// router.get('/feed/:userId', postController.getFeed);

// router.post('/:id/like', postController.likePost);
// router.delete('/:id/like', postController.unlikePost);
// router.get('/:id/like/:userId', postController.checkLike);

// router.post('/:id/comment', postController.addComment);
// router.get('/:id/comments', postController.getComments);


module.exports = router;


/*

User-Scoped Post Endpoints

| Method | Endpoint                     | Description                                                     |
| ------ | ---------------------------- | --------------------------------------------------------------- |
| `GET`  | `/api/v1/posts/me`           | Get all posts by authenticated user                             |
| `GET`  | `/api/v1/posts/user/:userId` | Get all posts by a specific user                                |
| `GET`  | `/api/v1/posts/feed`         | Get posts from users I follow (requires data from User Service) |

---

Like Endpoints

| Method   | Endpoint                  | Description                  |
| -------- | ------------------------- | ---------------------------- |
| `POST`   | `/api/v1/posts/:id/like`  | Like a post                  |
| `DELETE` | `/api/v1/posts/:id/like`  | Unlike a post                |
| `GET`    | `/api/v1/posts/:id/likes` | Get users who liked the post |

---

Comment & Reply Endpoints

| Method   | Endpoint                              | Description                                |
| -------- | ------------------------------------- | ------------------------------------------ |
| `POST`   | `/api/v1/posts/:id/comments`          | Add a comment to a post                    |
| `GET`    | `/api/v1/posts/:id/comments`          | Get all comments for a post                |
| `POST`   | `/api/v1/comments/:commentId/reply`   | Reply to a comment (threaded reply)        |
| `GET`    | `/api/v1/comments/:commentId/replies` | Get replies to a specific comment          |
| `PUT`    | `/api/v1/comments/:commentId`         | Edit a comment or reply (owner only)       |
| `DELETE` | `/api/v1/comments/:commentId`         | Delete a comment or reply (owner or admin) |

---

Cross-Service & Supporting Endpoints

| Method | Endpoint                     | Description                                    |
| ------ | ---------------------------- | ---------------------------------------------- |
| `GET`  | `/api/v1/users/me/following` | Get list of users I'm following (User Service) |
| `GET`  | `/api/v1/users/:id/avatar`   | Get avatar of a user (Media Service)           |
| `GET`  | `/api/v1/users/:id/profile`  | Get profile info (username, nickname, etc.)    |
*/