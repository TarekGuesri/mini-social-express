const { validationResult } = require('express-validator');

const ErrorLogger = require('../helpers/errorLogger');
const User = require('../models/User');
const Post = require('../models/Post');

// @route GET /rest/posts
// @desc  Get posts
// @access  Public
exports.getPosts = async (req, res, next) => {
  const posts = await Post.findAll({
    include: [{ model: User }],
  });

  res.json(posts);
};

// @route POST /rest/posts
// @desc  Create post
// @access  Private
exports.createPost = async (req, res, next) => {
  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { title, content, imgUrl } = req.body;

  await Post.create({
    title,
    content,
    imgUrl,
    user_id: req.user.id,
  });

  res.json({ msg: 'Post Created!' });
};

// @route GET /rest/posts/latest
// @desc  Get latest 3 posts
// @access  Public
exports.getGetLatestPosts = async (req, res, next) => {
  const posts = await Post.findAll({
    order: [['createdAt', 'DESC']],
    limit: 3,
    include: [{ model: User }],
  });

  res.json(posts);
};

// @route GET /rest/posts/:id
// @desc  Get post by ID
// @access  Public
exports.getPost = async (req, res, next) => {
  const post = await Post.findOne({
    where: { id: req.params.id },
    include: [{ model: User }],
  });

  if (!post) {
    return res.status(404).json({ msg: 'Post not found!' });
  }

  res.json(post);
};
