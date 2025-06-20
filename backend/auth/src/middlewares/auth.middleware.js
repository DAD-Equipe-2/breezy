const jwt  = require('jsonwebtoken');
const User = require('../models/user.model');


function authenticateJWT(key) {
    return (req, res, next) => {
        const authHeader = req.headers.authorization;

        try {
            // Check if the Authorization header is present
            if (!authHeader) return res.status(401).json({ message: 'No token provided' });

            // Check if the token starts with 'Bearer '
            if (!authHeader.startsWith('Bearer ')) return res.status(401).json({ message: 'Invalid token format' });

            // Extract the token from the Authorization header
            const token = authHeader.split(' ')[1];

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