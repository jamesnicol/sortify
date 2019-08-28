const { User } = require('../models');
const { COOKIE_USER_KEY } = require('../../config');

module.exports = async (req, res, next) => {
  const userId = req.cookies ? req.cookies[COOKIE_USER_KEY] : null;
  const user = await User.findOne({ spotifyId: userId });
  req.currentUser = user;
  next();
};
