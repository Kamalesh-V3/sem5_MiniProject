const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({}, { strict: false, timestamps: true });
module.exports = mongoose.models.Order || mongoose.model('Order', orderSchema);
