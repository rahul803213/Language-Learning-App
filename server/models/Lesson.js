const mongoose = require('mongoose');
const Question = require('./Question');

const lessonSchema = new mongoose.Schema({
  lessonId: Number,
  language: String,
  questions: [Question],
});

const lessonModel = mongoose.model('Lesson', lessonSchema);

module.exports = lessonModel;
