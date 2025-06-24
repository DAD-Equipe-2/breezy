const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    author: { 
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    content: {
        type: String,
        required: true,
        maxlength: 280
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
    }],
    comments: [{
        type: { 
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }
    }],
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
}, { timestamps: true });

module.exports = mongoose.model('Post', PostSchema);