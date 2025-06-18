const jwt    = require('jsonwebtoken');
const bcrypt = require('bcrypt');


const User = require('../models/user.model');


exports.register = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ username: username });
        if (existingUser) {
            return res.status(400).json({
                message: 'Username already exists'
            });
        }

        // Check if the username is valid
        const usernameRegex = /^[a-zA-Z0-9_]{3,}$/;     // At least 3 characters, alphanumeric and underscores
        if (!usernameRegex.test(username)) {
            return res.status(400).json({
                message: 'Username must be at least 3 characters long and can only contain letters, numbers, and underscores'
            });
        }

        // Check if the password is valid
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/;     // At least 6 characters, one uppercase, one lowercase, one number
        if (!passwordRegex.test(password)) {
            return res.status(400).json({
                message: 'Password must be at least 6 characters long and contain at least one uppercase letter, one lowercase letter, and one number'
            });
        }

        // Create a new user
        const newUser = new User({
            username: username,
            password: password
        });
        await newUser.save();

        return res.status(201).json({ message: 'User registered successfully' });
    }
    catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
};


exports.login = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Check if the user exists and if the password is correct
        const user = await User.findOne({ username: username });
        if (!user || !(bcrypt.compareSync(password, user.password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Create a JWT token payload
        const payload = {
            username: user.username,
            role: user.role
        };
        
        // Sign the JWT token with the secret key and set an expiration time
        const accessToken = jwt.sign(payload, process.env.ACCESS_JWT_KEY, { expiresIn: '1h' });

        const expiresIn = Math.floor(Date.now() / 1000) + (1 * 60 * 60); // 1 hour

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
        return res.status(500).json({ message: 'Internal server error' });
    }
};


exports.verify = async (req, res) => {
    return res.status(200).json({ message: 'Token is valid' });
}


// Renew the token


// Delete a user