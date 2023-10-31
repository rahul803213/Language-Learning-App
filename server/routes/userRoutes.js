// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');

// Create a new user
router.post('/signup', async (req, res) => {
  try {
    const user = await userController.createUser(req.body);
    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Define other user-related routes here (e.g., fetching, updating, deleting users)

module.exports = router;