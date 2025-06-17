const Class = require('../models/class');

exports.showCreate = (req, res) => {
  res.render('create_class');
};

exports.create = async (req, res) => {
  const { className } = req.body;
  await Class.create({ className });
  res.redirect('/classes/list');
};

exports.list = async (req, res) => {
  const classes = await Class.find();
  res.render('list_class', { classes });
};

exports.delete = async (req, res) => {
  const { id } = req.params;
  await Class.findByIdAndDelete(id);
  res.redirect('/classes/list');
};