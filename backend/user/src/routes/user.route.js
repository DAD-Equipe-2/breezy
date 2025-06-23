const express               = require('express');
const userController        = require('../controllers/user.controller');
const { requireBodyParams } = require('../middlewares/params.middleware');


const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: User
 *     description: User related endpoints
 *   - name: 🔒 Internal
 *     description: Internal endpoints for user service
 * components:
 *  securitySchemes:
 *   bearerAuth:
 *    type: http
 *    scheme: bearer
 *    bearerFormat: JWT
 *    description: Use the access token to authenticate requests. The token should be included in the Authorization
*/


/**
* @swagger
* /:
*   post:
*     summary: Create a new user
*     tags: [🔒 Internal]
*     security:
*       - bearerAuth: []
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