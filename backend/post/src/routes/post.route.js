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

router.post('/', postController.createPost);
router.get('/', postController.listPosts);
router.get('/:id', postController.getPost);

router.get('/user/:userId', postController.getPostsByUser);
router.get('/feed/:userId', postController.getFeed);

router.post('/:id/like', postController.likePost);
router.delete('/:id/like', postController.unlikePost);
router.get('/:id/like/:userId', postController.checkLike);

router.post('/:id/comment', postController.addComment);
router.get('/:id/comments', postController.getComments);


module.exports = router;


/*

Core Post Endpoints

| Method   | Endpoint            | Description                                  |
| -------- | ------------------- | -------------------------------------------- |
| `POST`   | `/api/v1/posts`     | Create a new post (auth required)            |
| `GET`    | `/api/v1/posts/:id` | Get a post by ID                             |
| `PUT`    | `/api/v1/posts/:id` | Update an existing post (author only)        |
| `PATCH`  | `/api/v1/posts/:id` | Partially update a post (e.g., content only) |
| `DELETE` | `/api/v1/posts/:id` | Delete a post (author only)                  |

---

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