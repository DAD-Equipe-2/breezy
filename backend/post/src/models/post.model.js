const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    author: { 
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
        maxlength: 280
    },
    parent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        default: null
    },
    likes: [String],
    comments: {
        type: Number,
        default: 0
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
}, { timestamps: true });

module.exports = mongoose.model('Post', PostSchema);