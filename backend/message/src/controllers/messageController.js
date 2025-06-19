const Message = require('../models/Message');

// Envoyer un message
exports.sendMessage = async (req, res) => {
    try {
        const msg = await Message.create({
            sender:   req.body.sender,
            receiver: req.body.receiver,
            content:  req.body.content
        });
        res.status(201).json(msg);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Récupérer la conversation entre deux users
exports.getConversation = async (req, res) => {
    const { user1, user2 } = req.query;
    try {
        const msgs = await Message.find({
            $or: [
                { sender: user1, receiver: user2 },
                { sender: user2, receiver: user1 }
            ]
        }).sort('createdAt');
        res.json(msgs);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Marquer comme lu
exports.markAsRead = async (req, res) => {
    try {
        const msg = await Message.findByIdAndUpdate(
            req.params.id, { read: true }, { new: true }
        );
        if (!msg) return res.status(404).json({ error: 'Message not found' });
        res.json(msg);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
