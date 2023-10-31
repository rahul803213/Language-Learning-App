// model/user.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  languageToLearn: String,
  proficiencyLevel: {
    type: Number,
    default: 0,
  },
  nativeLanguage: String,
  progress: {
    type: Number,
    default: 0,
  },
  score: {
    type: Number,
    default: 0,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
