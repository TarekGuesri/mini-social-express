const { validationResult } = require('express-validator');

const ErrorLogger = require('../helpers/errorLogger');
const User = require('../models/User');
const Post = require('../models/Post');
const Comment = require('../models/Comment');

// @route GET /rest/comments/post/:postId
// @desc  Get comments by post id
// @access  Public
exports.getCommentsByPostId = async (req, res, next) => {
  const comments = await Comment.findAll({
    where: { post_id: req.params.postId },
    include: [{ model: User }],
  });

  res.json(comments);
};

// @route POST /rest/comments/post/:postId
// @desc  Adds a comments to a post
// @access  Private
exports.addComment = async (req, res, next) => {
  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const post = await Post.findOne({ where: { id: req.params.postId } });

  if (!post) {
    return res.status(404).json({ msg: 'Post not found!' });
  }

  const comment = await Comment.create({
    content: req.body.content,
    user_id: req.user.id,
    post_id: req.params.postId,
  });

  res.json(comment);
};
