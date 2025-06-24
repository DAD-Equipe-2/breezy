const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    content: {
        type: String, 
        required: true,
        maxlength: 280
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    replies: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }],
});

module.exports = mongoose.model('Comment', CommentSchema);