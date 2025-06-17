const mongoose = require('mongoose');

const examSessionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  exam: { type: mongoose.Schema.Types.ObjectId, ref: 'Exam', required: true },
  date: { type: Date, required: true }
});

module.exports = mongoose.model('ExamSession', examSessionSchema);