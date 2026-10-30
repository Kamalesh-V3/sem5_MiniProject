const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: () => new mongoose.Types.ObjectId().toString()
    },
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true
    },
    phone: {
      type: String,
      trim: true
    },
    dob: {
      type: String
    },
    gender: {
      type: String
    },
    password: {
      type: String,
      required: true
    },
    role: {
      type: String,
      enum: ['customer', 'artist', 'admin'],
      default: 'customer'
    },
    isArtist: {
      type: Boolean,
      default: false
    },
    artistApplicationStatus: {
      type: String,
      enum: ['none', 'pending', 'approved', 'rejected'],
      default: 'none'
    },
    bio: {
      type: String,
      default: ''
    },
    avatar: {
      type: String,
      default: '/images/Profile image/profile-placeholder.svg'
    },
    upiId: {
      type: String,
      default: ''
    },
    upiQr: {
      type: String,
      default: ''
    },
    bankDetails: {
      type: mongoose.Schema.Types.Mixed,
      default: null
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  {
    strict: false,
    timestamps: true
  }
);

module.exports = mongoose.models.User || mongoose.model('User', userSchema);
