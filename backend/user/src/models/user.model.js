const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 3,
        maxlength: 30,
    },
    nickname: {
        type: String,
        default: '',
        trim: true,
        maxlength: 50,
    },
    bio: {
        type: String,
        default: '',
        maxlength: 300,
    },
    avatar: {
        data: Buffer,
        contentType: String
    },
    followers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' 
    }],
    following: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' 
    }]
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);