const Student = require('../models/student');
const Class = require('../models/class');
const ExamSession = require('../models/examSession');

exports.showAddAndList = async (req, res) => {
  const classes = await Class.find();
  const students = await Student.find().populate('class');
  res.render('add_and_list_student', { classes, students });
};

exports.add = async (req, res) => {
  const { name, dob, studentId, classId } = req.body;
  const classes = await Class.find();
  const students = await Student.find().populate('class');

  // Kiểm tra trùng studentId
  const existed = await Student.findOne({ studentId });
  if (existed) {
    return res.render('add_and_list_student', {
      classes,
      students,
      error: 'Mã số sinh viên đã tồn tại!'
    });
  }

  await Student.create({ name, dob, studentId, class: classId });
  res.redirect('/students/add');
};

exports.showLogin = (req, res) => {
  res.render('student_login');
};

exports.login = async (req, res) => {
  const { studentId, password } = req.body;
  const student = await Student.findOne({ studentId });
  if (student) {
    // Chuyển ngày sinh trong DB về yyyy-mm-dd
    const dobString = student.dob instanceof Date
      ? student.dob.toISOString().slice(0, 10)
      : new Date(student.dob).toISOString().slice(0, 10);

    if (dobString === password) {
      req.session.student = student._id;
      return res.redirect('/students/info');
    }
  }
  res.render('student_login', { error: 'Sai mã số sinh viên hoặc mật khẩu!' });
};

exports.info = async (req, res) => {
  if (!req.session.student) return res.redirect('/students/login');
  const student = await Student.findById(req.session.student).populate('class');
  const sessions = await ExamSession.find().populate('exam');
  res.render('student_info', { student, sessions }); // Thêm sessions vào đây
};

exports.delete = async (req, res) => {
  await Student.findByIdAndDelete(req.params.id);
  res.redirect('/students/add');
};