const jwt = require('jsonwebtoken');
const User = require('../models/User');

const { jwtSecret } = require('../config/config');

module.exports = async (req, res, next) => {
  // Get token from head
  const token = req.header('x-auth-token');

  // Check if not token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, jwtSecret);

    const user = await User.findOne({
      where: { id: decoded.user.id },
    });
    if (!user) {
      return res
        .status(404)
        .json({ msg: "Token's user has been deleted already!" });
    }

    req.user = decoded.user;
    req.role = user.role;

    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
