const axios = require('axios');

AUTH_SERVICE_URL = 'http://auth-service:3000';
USER_SERVICE_URL = 'http://user-service:3000';


exports.register = async (req, res) => {
    const { username, password, nickname } = req.body;

    let authRes = null;
    let userRes = null;

    // Register with auth-service
    try {
        authRes = await axios.post(`${AUTH_SERVICE_URL}/register`, {
            username,
            password
        });
    }
    catch (err) {
        return res.status(err.response?.status || 500).json({ error: err.response?.data?.message || 'Authentication service error' });
    }

    // Create user with user-service
    try {
        userRes = await axios.post(`${USER_SERVICE_URL}/`, {
            nickname
        }, {
            headers: { 'x-user-name': username }
        });
    }
    catch (err) {
        // If user service fails, we should ideally clean up the auth service registration
        try {
            await axios.delete(`${AUTH_SERVICE_URL}/delete`, {
                headers: { 'x-user-name': username }
            });
        }
        catch (cleanupErr) {
            console.error('Failed to clean up auth service after user service error:', cleanupErr);
        }

        return res.status(err.response?.status || 500).json({ error: err.response?.data?.message || 'User service error' });
    }

    return res.status(201).json({
        message: 'User registered successfully',
        auth: authRes?.data,
        profile: userRes?.data
    });
};