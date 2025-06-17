const Question = require('../models/question');

exports.showAddAndList = async (req, res) => {
  const questions = await Question.find();
  res.render('add_and_list_question', { questions });
};

exports.add = async (req, res) => {
  const { content, option1, option2, option3, option4, answer } = req.body;
  await Question.create({
    content,
    options: [option1, option2, option3, option4],
    answer: parseInt(answer)
  });
  res.redirect('/questions/add');
};

exports.delete = async (req, res) => {
  try {
    await Question.findByIdAndDelete(req.params.id);
    res.redirect('/questions'); // hoặc route danh sách câu hỏi của bạn
  } catch (err) {
    res.status(500).send('Lỗi khi xoá câu hỏi');
  }
};