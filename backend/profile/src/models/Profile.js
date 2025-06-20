const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    bio: { type: String, default: '' },
    avatar: { type: String, default: '' },
    location: { type: String, default: '' },
    website: { type: String, default: '' },
}, { timestamps: true });

module.exports = mongoose.model('Profile', ProfileSchema);
