const express = require('express');
const router = express.Router();

// users
router.use('/users', require('./rest/users'));

// posts
router.use('/posts', require('./rest/posts'));

// posts
router.use('/comments', require('./rest/comments'));

module.exports = router;
