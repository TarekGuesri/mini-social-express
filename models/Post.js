const Sequelize = require('sequelize');
const User = require('./User');
const db = require('../config/db');

const Post = db.define(
  'posts',
  {
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    content: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    imgUrl: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    // The id of the poster
    user_id: {
      type: Sequelize.INTEGER,
      references: {
        model: User,
        key: 'id',
      },
      allowNull: false,
    },
  },
  {
    charset: 'utf8',
    collate: 'utf8_general_ci',
  }
);

module.exports = Post;
