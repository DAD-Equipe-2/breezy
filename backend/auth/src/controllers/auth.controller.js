const jwt    = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const User   = require('../models/user.model');


exports.register = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ username: username });
        if (existingUser) return res.status(400).json({ message: 'Username already exists' });

        // Check if the username is valid
        const usernameRegex = /^[a-zA-Z0-9_]{3,}$/;     // At least 3 characters, alphanumeric and underscores
        if (!usernameRegex.test(username)) {
            return res.status(400).json({
                message: 'Username must be at least 3 characters long and can only contain letters, numbers, and underscores'
            });
        }

        // Check if the password is valid
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;     // At least 6 characters, one uppercase, one lowercase, one number
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


async function generateTokens(user) {
    // Create a JWT token payload
    const payload = {
        username: user.username,
        role: user.role
    };
    
    // Sign the JWT token with the secret key and set an expiration time
    const accessToken  = jwt.sign(payload, process.env.ACCESS_JWT_KEY,  { expiresIn: '1h' });
    const refreshToken = jwt.sign(payload, process.env.REFRESH_JWT_KEY, { expiresIn: '7d' });

    const oneHourMs      = 60 * 60 * 1000;              // 1 hour in ms
    const sevenDaysMs    = 7 * 24 * 60 * 60 * 1000;     // 7 days in ms

    return { accessToken, accessToken_expiresIn: oneHourMs, refreshToken, refreshToken_expiresIn: sevenDaysMs };
}

async function saveRefreshToken(user, refreshToken) {
    // Save the refresh token in the user document (optional, for revocation purposes)
    user.refresh_token = refreshToken;
    await user.save();
}

async function setTokenCookies(res, accessToken, refreshToken, accessToken_expiresIn, refreshToken_expiresIn) {
    res.cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: true,
        maxAge: accessToken_expiresIn,
    });

    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: true,
        maxAge: refreshToken_expiresIn,
    });
}


exports.login = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Check if the user exists and if the password is correct
        const user = await User.findOne({ username: username });
        if (!user || !(bcrypt.compareSync(password, user.password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate access and refresh tokens
        const { accessToken, refreshToken, accessToken_expiresIn, refreshToken_expiresIn } = await generateTokens(user);

        // Save the refresh token in the database (optional, for revocation purposes)
        await saveRefreshToken(user, refreshToken);

        // Set the token in a cookie with httpOnly and secure flags
        setTokenCookies(res, accessToken, refreshToken, accessToken_expiresIn, refreshToken_expiresIn);

        return res.status(200).json({
            message: 'Login successful',
            accessToken_expiresIn: accessToken_expiresIn,
            refreshToken_expiresIn: refreshToken_expiresIn,
        });
    }
    catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
};


exports.verify = async (req, res) => {
    // Set headers for user information
    res.set('X-User-Name', req.user.username);
    res.set('X-User-Role', req.user.role);
    return res.sendStatus(204);
};


exports.renewToken = async (req, res) => {
    try {
        // Check if the refresh token matches
        const user = await User.findOne({ username: req.user.username });
        if (!user || user.refresh_token !== req.token) return res.status(403).json({ message: 'Invalid or expired refresh token' });
        
        // Generate access and refresh tokens
        const { accessToken, refreshToken, accessToken_expiresIn, refreshToken_expiresIn } = await generateTokens(user);

        // Save the refresh token in the database (optional, for revocation purposes)
        await saveRefreshToken(user, refreshToken);

        // Set the token in a cookie with httpOnly and secure flags
        setTokenCookies(res, accessToken, refreshToken, accessToken_expiresIn, refreshToken_expiresIn);

        return res.status(200).json({
            message: 'Access token renewed',
            accessToken_expiresIn: accessToken_expiresIn
        });
    }
    catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
};


exports.delete = async (req, res) => {
    const username = req.headers['x-user-name'];
    try {
        // Find the user by username and delete
        const user = await User.findOneAndDelete({ username: username });
        if (!user) return res.status(404).json({ message: 'User not found' });
        return res.status(200).json({ message: 'User deleted successfully' });
    }
    catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
};


exports.logout = async (req, res) => {
    try {
        // Clear the cookies
        res.clearCookie('accessToken', { httpOnly: true, secure: true });
        res.clearCookie('refreshToken', { httpOnly: true, secure: true });

        // Invalidate the refresh token in the database
        await User.findOneAndUpdate({ username: req.user.username }, { refresh_token: null }, { new: true });
       
        return res.status(200).json({ message: 'Logged out successfully' });
    }
    catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
}