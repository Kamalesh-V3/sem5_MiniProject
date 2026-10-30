const mongoose = require('mongoose');

const artSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: () => new mongoose.Types.ObjectId().toString()
    },
    title: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      trim: true
    },
    category: {
      type: String,
      required: true
    },
    dimensions: {
      type: String,
      default: '24 x 36 inches'
    },
    price: {
      type: Number,
      required: true
    },
    imageUrl: {
      type: String,
      required: true
    },
    artist: {
      type: String,
      required: true
    },
    artistName: {
      type: String
    },
    artistUsername: {
      type: String
    },
    artistAvatar: {
      type: String
    },
    artistUpiId: {
      type: String
    },
    artistUpiQr: {
      type: String
    },
    artistBankDetails: {
      type: mongoose.Schema.Types.Mixed,
      default: null
    },
    likes: {
      type: [String],
      default: []
    },
    likesCount: {
      type: Number,
      default: 0
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending'
    },
    rejectionReason: {
      type: String,
      default: ''
    }
  },
  {
    strict: false,
    timestamps: true
  }
);

module.exports = mongoose.models.Art || mongoose.model('Art', artSchema);
