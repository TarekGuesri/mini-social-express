const express = require('express');
const router = express.Router();

const { check } = require('express-validator');

// Controllers
const { getPosts, getPost, createPost } = require('../../controllers/posts');

// Middlewares
const auth = require('../../middleware/auth');

router.get('/', getPosts);

router.post(
  '/',
  auth,
  [
    check('title', 'Title is required!').notEmpty(),
    check('content', 'Content must be at least 10 characters!').isLength({
      min: 6,
    }),
  ],
  createPost
);

router.get('/:id', getPost);

module.exports = router;
