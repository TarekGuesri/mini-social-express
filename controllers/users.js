const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const ErrorLogger = require('../helpers/errorLogger');
const { USER } = require('../strings/roles');

const User = require('../models/User');

// @route POST users/
// @desc Register a user
// @access Public
exports.registerUser = async (req, res, next) => {
  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  let { username, password } = req.body;

  // Checking if there is another user with the same username
  const sameUsername = await User.findOne({ where: { username } });
  if (sameUsername) {
    return res.status(400).json({
      msg: "Il y a déjà un utilisateur avec ce nom d'utilisateur",
    });
  }

  try {
    await User.create({
      username,
      password: await User.hashPassword(password),
      role: USER,
    });

    res.json({ msg: 'User created successfully' });
  } catch (error) {
    ErrorLogger(req, 1, error);
    return res.status(500).send({ msg: 'Server Error!' });
  }
};
