const jwt  = require('jsonwebtoken');
const User = require('../models/user.model');


function authenticateJWT(key, type = 'access') {
    return (req, res, next) => {
        const token = type == 'access' ? req.cookies.accessToken : req.cookies.refreshToken;

        try {
            // Check if the token is present
            if (!token) return res.status(401).json({ message: 'No token provided' });

            // Verify the token using the secret key
            jwt.verify(token, key, async (err, decoded) => {
                if (err) {
                    if (err.name === 'TokenExpiredError') {
                        return res.status(403).send({ message: 'Token expired' });
                    } else {
                        return res.status(401).send({ message: 'Invalid token' });
                    }
                }

                // Check if the user exists in the database
                const user = await User.findOne({ username: decoded.username });
                if (!user) return res.status(404).json({ message: 'User not found' });

                req.user = decoded;
                req.token = token;
                next();
            });
        }
        catch (err) {
            return res.status(500).json({ message: 'Internal server error' });
        }
    }
}

module.exports = { authenticateJWT };