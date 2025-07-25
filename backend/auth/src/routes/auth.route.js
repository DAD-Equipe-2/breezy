const express               = require('express');
const authController        = require('../controllers/auth.controller');
const { requireBodyParams } = require('../middlewares/params.middleware');
const { authenticateJWT }   = require('../middlewares/auth.middleware');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Auth
 *     description: Authentication related endpoints
 *   - name: 🔒 Internal
 *     description: Internal endpoints for authentication service
*/


/**
 * @swagger
 * /register:
 *   post:
 *     summary: Register a new user
 *     tags: [🔒 Internal]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Bad request
*/
router.post('/register', requireBodyParams('username', 'password'), authController.register);


/**
 * @swagger
 * /login:
 *   post:
 *     summary: Login a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User logged in successfully
 *       400:
 *         description: Bad request
*/
router.post('/login', requireBodyParams('username', 'password'), authController.login);


/**
 * @swagger
 * /verify:
 *   get:
 *     summary: Verify access token
 *     tags: [🔒 Internal]
 *     security:
 *      - cookieAuth: []
 *     responses:
 *       200:
 *         description: Access token is valid
 *       401:
 *         description: Invalid or missing refresh token
 *       403:
 *         description: Access token expired
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
*/
router.get('/verify', authenticateJWT(process.env.ACCESS_JWT_KEY, 'access'), authController.verify);


/**
 * @swagger
 * /renew:
 *   post:
 *     summary: Renew access token using refresh token
 *     tags: [Auth]
 *     security:
 *      - cookieAuth: []
 *     responses:
 *       200:
 *         description: Access token renewed successfully
 *       401:
 *         description: Invalid or missing refresh token
 *       403:
 *         description: Refresh token expired
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
*/
router.post('/renew', authenticateJWT(process.env.REFRESH_JWT_KEY, 'refresh'), authController.renewToken);


/**
 * @swagger
 * /delete:
 *   delete:
 *     summary: Delete user account
 *     tags: [🔒 Internal]
 *     security:
 *      - cookieAuth: []
 *     responses:
 *       200:
 *         description: User account deleted successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
*/
router.delete('/delete', authController.delete);


/**
 * @swagger
 * /logout:
 *   post:
 *     summary: Logout user
 *     tags: [Auth]
 *     security:
 *      - cookieAuth: []
 *     responses:
 *       200:
 *         description: User logged out successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
*/
router.post('/logout', authenticateJWT(process.env.ACCESS_JWT_KEY, 'access'), authController.logout);


module.exports = router;