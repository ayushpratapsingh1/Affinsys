const User = require('../models/user');
const { hashPassword } = require('../utils/passwordUtils');
const { writeJsonFile } = require('../utils/fileStorage');

async function registerUser(req, res, next) {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }

    const userExists = await User.exists(username);
    if (userExists) {
      return res.status(409).json({ error: 'Username already exists' });
    }

    // Hash the password
    const hashedPassword = hashPassword(password);
    console.log(`Registering user ${username} with hashed password`);

    // Create the user
    await User.create(username, hashedPassword);
    
    // Double-check the user was saved
    const users = await User.getUsers();
    console.log('Current users:', Object.keys(users));

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error in user registration:', error);
    next(error);
  }
}

module.exports = {
  registerUser
};
