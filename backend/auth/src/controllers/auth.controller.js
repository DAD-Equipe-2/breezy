const jwt    = require('jsonwebtoken');
const bcrypt = require('bcrypt');


const User = require("../models/user.model");


exports.register = async (req, res) => {
    // Add middleware to check if the request body contains username and password
    const { username, password } = req.body;

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ username: username });
        if (existingUser) {
            return res.status(400).json({
                message: 'Username already exists'
            });
        }

        // Check if the password is strong enough
        if (password.length < 6) {
            return res.status(400).json({
                message: 'Password must be at least 6 characters long'
            });
        }

        // Check if the username is valid
        const usernameRegex = /^[a-zA-Z0-9_]{3,}$/; // At least 3 characters, alphanumeric and underscores
        if (!usernameRegex.test(username)) {
            return res.status(400).json({
                message: 'Username must be at least 3 characters long and can only contain letters, numbers, and underscores'
            });
        }

        // Check if the password is valid
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/; // At least 6 characters, one uppercase, one lowercase, one number
        if (!passwordRegex.test(password)) {
            return res.status(400).json({
                message: 'Password must be at least 6 characters long and contain at least one uppercase letter, one lowercase letter, and one number'
            });
        }

        // Create a new user
        const newUser = new User({
            username: username,
            password: bcrypt.hashSync(password, 10) // Hash the password
        });

        await newUser.save();

        return res.status(201).json({
            message: 'User registered successfully',
            user: {
                username: newUser.username
            }
        });
    } 
    catch (error) {
        return res.status(500).json({
            message: 'Internal server error'
        });
    }
};



exports.login = async (req, res) => {
    const { username, password } = req.body;

    try {

        // Check if the user exists
        const user = User.findOne({ username: username });
        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            });
        }

        // Check if the password is correct
        const isPasswordValid = bcrypt.compareSync(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                message: 'Invalid password'
            });
        }

        // Create a JWT token payload
        const payload = {
            username: user.username,
        };
        
        // Sign the JWT token with the secret key and set an expiration time
        const accessToken = jwt.sign(payload, process.env.ACCESS_JWT_KEY, { expiresIn: '24h' });
       
        const expiresIn = Math.floor(Date.now() / 1000) + (24 * 60 * 60); // 24 hours 

        // Set the token in a cookie with httpOnly and secure flags
        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: true,
            maxAge: expiresIn * 1000,   // Convert seconds to milliseconds 
        });

        return res.status(200).json({
            message: 'Login successful',
            accessToken_expiresIn: expiresIn,
        });
    
    } 
    catch (error) {
        return res.status(500).json({
            message: 'Internal server error'
        });
    }
};



exports.verify = async (req, res) => {

    // Get the token from the Authorization header
    const token = req.headers['authorization']
    
    // Check if the token is provided
    if (!token) {
        return res.status(401).json({
            message: 'No token provided'
        });
    }

    // Check if the token starts with 'Bearer '
    if (!token.startsWith('Bearer ')) {
        return res.status(401).json({
            message: 'Invalid token format'
        });
    }

    // Extract the token from the Authorization header
    const accessToken = token.split(' ')[1];

    // Verify the token
    jwt.verify(accessToken, process.env.ACCESS_JWT_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                message: 'Invalid token'
            });
        }

        // If the token is valid, check if the user exists in the database
        User.findOne({ username: decoded.username }, (err, user) => {
            if (err || !user) {
                return res.status(404).json({
                    message: 'User not found'
                });
            }
        });

        // If the user exists, return the user information
        return res.status(200).json({
            message: 'Token is valid',
        });
        
    });
}


// Renew the token


// Delete a user