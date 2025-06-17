const express = require('express');
const router = express.Router();
const { upsertProfile, getProfile } = require('../controllers/profileController');

// POST /api/v1/profile/       → create/update profile
router.post('/', upsertProfile);

// GET  /api/v1/profile/:userId → get profile by user ID
router.get('/:userId', getProfile);

module.exports = router;
