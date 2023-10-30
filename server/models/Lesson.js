const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  question: String,
  options: [String],
  correctOption: Number,
  level: Number,
});

const lessonSchema = new mongoose.Schema({
  lessonId: Number,
  language: String,
  questions: [questionSchema],
});

const lessonModel = mongoose.model('Lesson', lessonSchema);

module.exports = lessonModel;
