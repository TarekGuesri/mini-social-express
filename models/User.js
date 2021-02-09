const Sequelize = require('sequelize');
const db = require('../config/db');

const User = db.define(
  'users',
  {
    username: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    role: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    charset: 'utf8',
    collate: 'utf8_general_ci',
  }
);

module.exports = User;
