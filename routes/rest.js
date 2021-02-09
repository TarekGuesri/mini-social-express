const express = require('express');
const router = express.Router();

// users
router.use('/users', require('./rest/users'));

// posts
router.use('/posts', require('./rest/posts'));

module.exports = router;
