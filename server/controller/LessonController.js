// quizController.js
const Lesson = require('../models/Lesson'); // Import your Mongoose model
import { quizData } from '../models/QuizData';

// Function to insert quiz data into the database
const insertQuizData = (callback) => {
  Lesson.create(quizData, (err, lesson) => {
    if (err) {
      console.error(err);
      callback(err);
    } else {
      console.log('Quiz data inserted successfully.');
      callback(null, lesson);
    }
  });
};

// Function to retrieve lessons related to a specific language
const getLessonsByLanguage = (language, callback) => {
  Lesson.find({ language }, (err, lessons) => {
    if (err) {
      console.error(err);
      callback(err);
    } else {
      callback(null, lessons);
    }
  });
};

module.exports = {
  insertQuizData,
  getLessonsByLanguage,
};
