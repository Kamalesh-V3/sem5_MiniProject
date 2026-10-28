const mongoose = require('mongoose');

const artSchema = new mongoose.Schema({}, { strict: false, timestamps: true });
module.exports = mongoose.models.Art || mongoose.model('Art', artSchema);
