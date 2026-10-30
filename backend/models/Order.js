const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: () => new mongoose.Types.ObjectId().toString()
    },
    orderNumber: {
      type: String,
      required: true,
      unique: true
    },
    art: {
      type: String,
      required: true
    },
    artTitle: {
      type: String
    },
    artImage: {
      type: String
    },
    artist: {
      type: String,
      required: true
    },
    artistName: {
      type: String
    },
    buyer: {
      type: String,
      required: true
    },
    buyerUsername: {
      type: String
    },
    buyerEmail: {
      type: String
    },
    customerDetails: {
      type: mongoose.Schema.Types.Mixed
    },
    amount: {
      type: Number,
      required: true
    },
    paymentMode: {
      type: String,
      default: 'UPI'
    },
    paymentDetails: {
      type: mongoose.Schema.Types.Mixed
    },
    orderStatus: {
      type: String,
      default: 'Confirmed'
    }
  },
  {
    strict: false,
    timestamps: true
  }
);

module.exports = mongoose.models.Order || mongoose.model('Order', orderSchema);
