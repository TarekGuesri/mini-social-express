const express = require('express');
const router = express.Router();

const { check } = require('express-validator');

// Controllers
const {
  getCommentsByPostId,
  addComment,
} = require('../../controllers/comments');

// Middlewares
const auth = require('../../middleware/auth');

router.get('/post/:postId', getCommentsByPostId);

router.post(
  '/post/:postId',
  auth,
  [check('content', 'Content is required!').notEmpty()],
  addComment
);

module.exports = router;
