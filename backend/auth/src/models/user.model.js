const mongoose = require('mongoose');
const bcrypt   = require('bcrypt');


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true, 
        unique: true,
        minlength: 3,
        maxlength: 30,
    },
    password: {
        type: String,
        required: true,
        maxlength: 100,
    },
    role: {
        type: String,
        enum: ['user', 'moderator', 'admin'],
        default: 'user',
    },
    refresh_token: {
        type: String,
        default: null,
    }
});

userSchema.pre('save', async function () {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
});

module.exports = mongoose.model('User', userSchema);