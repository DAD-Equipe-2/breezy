const authController = require('../controllers/auth.controller');
const { requireBodyParams } = require('../middlewares/params.middleware');
const authenticateJWT = require('../middlewares/auth.middleware');


module.exports = function(app) {
    app.post('/register', requireBodyParams('username', 'password'), authController.register);
    app.post('/login', requireBodyParams('username', 'password'), authController.login);
    app.get('/verify', authenticateJWT, authController.verify);
    app.post('/refresh-token', authenticateJWT, authController.refreshToken);
    app.delete('/user', authenticateJWT, authController.deleteUser);
};


// Use /token/refresh for refresh token functionality or /refresh-token
// Use /user/delete for deleting a user

// Add refresh token route
// Add a route to delete a user