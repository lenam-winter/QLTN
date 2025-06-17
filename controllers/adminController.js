const Admin = require('../models/admin');

exports.showLogin = (req, res) => {
  res.render('login');
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  const admin = await Admin.findOne({ username, password });
  if (admin) {
    req.session.admin = admin.username;
    res.send('Đăng nhập thành công! <a href="/admin/dashboard">Vào trang quản trị</a>');
  } else {
    res.render('login', { error: 'Sai tên đăng nhập hoặc mật khẩu!' });
  }
};

exports.dashboard = (req, res) => {
  if (!req.session.admin) {
    return res.redirect('/admin/login');
  }
  res.render('admin_dashboard', { admin: req.session.admin });
};

exports.logout = (req, res) => {
  req.session.destroy();
  res.redirect('/admin/login');
};