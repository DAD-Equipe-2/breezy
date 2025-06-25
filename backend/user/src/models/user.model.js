const mongoose = require('mongoose');

const AvatarSchema = new mongoose.Schema({
  data: {
    type: Buffer,
    validate: {
      validator: function (v) {
        return !v || v.length <= 5 * 1024 * 1024; // 5MB
      },
      message: 'Avatar size exceeds the limit of 5MB'
    }
  },
  contentType: {
    type: String
  }
}, { _id: false });     // disable _id for embedded subdocument

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
  avatar: AvatarSchema,
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