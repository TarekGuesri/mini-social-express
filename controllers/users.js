const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const ErrorLogger = require('../helpers/errorLogger');
const { USER, ADMIN } = require('../strings/roles');
const { jwtSecret } = require('../config/config');

const User = require('../models/User');

// @route POST users/
// @desc Registers a user
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

// @route POST users/login
// @desc Logins a user
// @access Public
exports.loginUser = async (req, res, next) => {
  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, password } = req.body;

  const user = await User.findOne({
    where: { username },
  });

  if (!user) {
    return res.status(400).json({ msg: 'Invalid Credentials' });
  }

  // Checking if the password matches
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(400).json({ msg: 'Invalid Credentials' });
  }

  const payload = {
    user: {
      id: user.id,
      role: ADMIN,
    },
  };

  jwt.sign(payload, jwtSecret, (err, token) => {
    if (err) throw err;
    return res.json({ token });
  });
};

// @route GET users/self
// @desc Gets logged in user info
// @access Private
exports.getSelf = async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: { id: req.user.id },
    });
    if (!user) return res.status(404).json({ msg: 'User not found' });

    return res.json(user);
  } catch (error) {
    ErrorLogger(req, 1, error);
    return res.status(500).send({ msg: 'Erreur du serveur' });
  }
};
