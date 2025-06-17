const mongoose = require('mongoose');
const Admin = require('./models/admin');

mongoose.connect('mongodb://localhost:27017/qltn', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(async () => {
  await Admin.create({ username: 'admin', password: '123456' });
  console.log('Đã thêm admin!');
  mongoose.disconnect();
});