const authController        = require('../controllers/auth.controller');
const { requireBodyParams } = require('../middlewares/params.middleware');
const { authenticateJWT }   = require('../middlewares/auth.middleware');


/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication related endpoints
*/

module.exports.register = function(app) {
    /**
     * @swagger
     * /register:
     *   post:
     *     summary: Register a new user
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
     *       201:
     *         description: User registered successfully
     *       400:
     *         description: Bad request
     */
    app.post('/register', requireBodyParams('username', 'password'), authController.register);
}

module.exports.login = function(app) {
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
    app.post('/login', requireBodyParams('username', 'password'), authController.login);
}

module.exports.verify = function(app) {
    /**
     * @swagger
     * /verify:
     *   post:
     *     summary: Verify access token
     *     tags: [Auth]
     *     security:
     *      - bearerAuth: []
     *     responses:
     *       200:
     *         description: Access token is valid
     *       401:
     *         description: Unauthorized
     */
    app.post('/verify', authenticateJWT(process.env.ACCESS_JWT_KEY), authController.verify);
}

module.exports.renew = function(app) {
    /**
     * @swagger
     * /renew:
     *   post:
     *     summary: Renew access token using refresh token
     *     tags: [Auth]
     *     security:
     *      - bearerAuth: []
     *     responses:
     *       200:
     *         description: Access token renewed successfully
     *       401:
     *         description: Unauthorized
     */
    app.post('/renew', authenticateJWT(process.env.REFRESH_JWT_KEY), authController.renewToken);
}