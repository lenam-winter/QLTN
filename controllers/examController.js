const Exam = require('../models/exam');
const Question = require('../models/question');

exports.showAddAndList = async (req, res) => {
  const exams = await Exam.find();
  const questionCount = await Question.countDocuments();
  res.render('add_and_list_exam', { exams, questionCount });
};

exports.add = async (req, res) => {
  const { name, duration, numQuestions } = req.body;
  const total = await Question.countDocuments();
  const n = Math.min(parseInt(numQuestions), total);

  // Lấy ngẫu nhiên n câu hỏi
  const randomQuestions = await Question.aggregate([{ $sample: { size: n } }]);
  const questionIds = randomQuestions.map(q => q._id);

  await Exam.create({
    name,
    duration: parseInt(duration),
    questions: questionIds
  });

  res.redirect('/exams/add');
};