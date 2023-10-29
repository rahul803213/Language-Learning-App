// model/user.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  languageToLearn: String,
  proficiencyLevel: String,
  nativeLanguage: String,
  progress: Number,
});

const User = mongoose.model('User', userSchema);

module.exports = User;
