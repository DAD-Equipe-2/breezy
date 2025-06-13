const authController = require('../controllers/auth.controller');


module.exports = function(app) {
    app.post('/register', authController.register);
    app.post('/login', authController.login);
    app.get('/verify', authController.verify);
};

// Add refresh token route