// index.js
const express = require('express');
const connectDB = require('./db');
const bodyParser = require('body-parser');
const examRoutes = require('./routes/exam');
const questionRoutes = require('./routes/question');
const classRoutes = require('./routes/class');
const adminRoutes = require('./routes/admin');
const studentRoutes = require('./routes/student');
const session = require('express-session');
const sessionRoutes = require('./routes/session');

const app = express();
const PORT = 3000;

// Gọi kết nối CSDL
connectDB();

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

app.use(session({
  secret: 'your_secret_key', // đổi thành chuỗi bí mật của bạn
  resave: false,
  saveUninitialized: true
}));

app.use('/exams', examRoutes);
app.use('/questions', questionRoutes);
app.use('/classes', classRoutes);
app.use('/admin', adminRoutes);
app.use('/students', studentRoutes);
app.use('/sessions', sessionRoutes);

app.get('/', (req, res) => {
  res.render('index');
});

app.listen(PORT, () => {
  console.log(`🚀 Server đang chạy tại http://localhost:${PORT}`);
});
