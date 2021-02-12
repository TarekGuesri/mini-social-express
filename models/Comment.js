const Sequelize = require('sequelize');
const User = require('./User');
const Post = require('./Post');
const db = require('../config/db');

const Comment = db.define(
  'comments',
  {
    content: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    post_id: {
      type: Sequelize.INTEGER,
      references: {
        model: Post,
        key: 'id',
      },
      allowNull: false,
    },
    // The id of the Commenter
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

module.exports = Comment;
