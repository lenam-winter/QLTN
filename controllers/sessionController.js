const ExamSession = require('../models/examSession');
const Exam = require('../models/exam');
const Question = require('../models/question');
const Student = require('../models/student');

exports.showAdd = async (req, res) => {
  const exams = await Exam.find();
  const sessions = await ExamSession.find().populate('exam');
  res.render('add_exam_session', { exams, sessions });
};

exports.add = async (req, res) => {
  const { name, examId, date } = req.body;
  await ExamSession.create({ name, exam: examId, date });
  res.redirect('/sessions/add'); // Đúng, quay lại trang tạo ca thi
};

exports.listForStudent = async (req, res) => {
  const sessions = await ExamSession.find().populate('exam');
  res.render('list_exam_session_student', { sessions });
};

// Hiển thị ca thi trên trang thông tin sinh viên
exports.studentInfoWithSessions = async (req, res) => {
  if (!req.session.student) return res.redirect('/students/login');
  const student = await Student.findById(req.session.student).populate('class');
  const sessions = await ExamSession.find().populate('exam');
  res.render('student_info', { student, sessions });
};

// Bắt đầu làm bài thi
exports.startExam = async (req, res) => {
  const session = await ExamSession.findById(req.params.sessionId).populate('exam');
  const questions = await Question.find({ _id: { $in: session.exam.questions } });
  req.session.examStart = Date.now();
  req.session.examDuration = session.exam.duration;
  res.render('do_exam', { session, questions, timeLeft: session.exam.duration * 60 });
};
//


exports.submitExam = async (req, res) => {
  const { sessionId } = req.params;
  let answers = {};
  const session = await ExamSession.findById(sessionId).populate('exam');
  const questions = await Question.find({ _id: { $in: session.exam.questions } });

  questions.forEach(q => {
    answers[q._id.toString()] = req.body['answers_' + q._id.toString()];
  });
  console.log('answers:', answers);

  // Nếu chỉ có 1 câu hỏi, answers sẽ là string
  if (typeof answers === 'string') {
    answers = { [questions[0]._id.toString()]: answers };
  }

  // Log để kiểm tra dữ liệu gửi lên
  console.log('req.body:', req.body);
  console.log('answers:', answers);

  let correct = 0;
  questions.forEach(q => {
    const userAnswer = answers[q._id.toString()];
    // ép kiểu về chuỗi để so sánh nếu DB lưu answer là chuỗi
    if (
      typeof userAnswer !== 'undefined' &&
      userAnswer !== null &&
      String(userAnswer) === String(q.answer)
    ) {
      correct++;
    }
  });

  const total = questions.length;
  const score = Math.round((correct / total) * 10 * 10) / 10;

  const examStart = req.session.examStart;
  const examEnd = Date.now();
  let durationSec = 0;
  if (examStart) {
    durationSec = Math.floor((examEnd - examStart) / 1000);
  }
  const durationMin = Math.floor(durationSec / 60);
  const durationRemainSec = durationSec % 60;

  res.render('exam_result', {
    session,
    total,
    correct,
    score,
    questions,
    answers,
    durationMin,
    durationRemainSec
  });
};