const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  spotifyId: String,
  spotifyAccessToken: String,
  spotifyRefreshToken: String
});

const User = mongoose.model('User', userSchema);

module.exports = User;
