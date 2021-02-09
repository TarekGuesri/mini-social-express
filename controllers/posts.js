// @desc  Get posts
// @route GET /rest/posts
// @access  Public
exports.getPosts = (req, res, next) => {
  res.json({ msg: 'Show all bootcamps' });
};
