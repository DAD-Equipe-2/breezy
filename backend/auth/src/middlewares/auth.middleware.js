const jwt  = require('jsonwebtoken');
const User = require('../models/user.model');


module.exports = function authenticateJWT(req, res, next) {
    const authHeader = req.headers.authorization;

    // Check if the Authorization header is present
    if (!authHeader) return res.status(401).json({ message: 'No token provided' });

    // Check if the token starts with 'Bearer '
    if (!authHeader.startsWith('Bearer ')) return res.status(401).json({ message: 'Invalid token format' });

    // Extract the token from the Authorization header
    const accessToken = authHeader.split(' ')[1];

    // Verify the token using the secret key
    jwt.verify(accessToken, process.env.ACCESS_JWT_KEY, (err, decoded) => {
        if (err) return res.status(401).json({ message: 'Invalid token' });
   
        // Check if the user exists in the database
        User.findOne({ username: decoded.username }, (err, user) => {
            if (err || !user) return res.status(404).json({ message: 'User not found' });
        });

        req.user = decoded;
        next();
    });
}