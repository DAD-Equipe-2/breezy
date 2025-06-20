const express = require('express');
const router = express.Router();
const {
    sendMessage,
    getConversation,
    markAsRead
} = require('../controllers/messageController');

// POST /api/v1/message/           → envoyer un MP
router.post('/', sendMessage);

// GET  /api/v1/message/conversation?user1=&user2=   → récupérer la conversation
router.get('/conversation', getConversation);

// PATCH /api/v1/message/:id/read  → marquer comme lu
router.patch('/:id/read', markAsRead);

module.exports = router;
