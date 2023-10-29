// controller/userController.js
const User = require('../model/user');

// Create a new user
exports.createUser = async (userData) => {
  try {
    const user = new User(userData);
    await user.save();
    return user;
  } catch (error) {
    throw error;
  }
};

// Retrieve a user by ID
exports.getUserById = async (userId) => {
  try {
    const user = await User.findById(userId);
    return user;
  } catch (error) {
    throw error;
  }
};

// Update a user
exports.updateUser = async (userId, userData) => {
  try {
    await User.findByIdAndUpdate(userId, userData);
  } catch (error) {
    throw error;
  }
};

// Delete a user by ID
exports.deleteUser = async (userId) => {
  try {
    await User.findByIdAndDelete(userId);
  } catch (error) {
    throw error;
  }
};
