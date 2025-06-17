const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  content: { type: String, required: true },
  options: [{ type: String, required: true }],
  answer: { type: Number, required: true }
});

module.exports = mongoose.model('Question', questionSchema);