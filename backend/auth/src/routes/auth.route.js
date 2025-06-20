const authController        = require('../controllers/auth.controller');
const { requireBodyParams } = require('../middlewares/params.middleware');
const { authenticateJWT }   = require('../middlewares/auth.middleware');


module.exports = function(app) {
    app.post('/register', requireBodyParams('username', 'password'), authController.register);
    app.post('/login', requireBodyParams('username', 'password'), authController.login);
    app.get('/verify', authenticateJWT(process.env.ACCESS_JWT_KEY), authController.verify);
    app.post('/renew', authenticateJWT(process.env.REFRESH_JWT_KEY), authController.renewToken);
};