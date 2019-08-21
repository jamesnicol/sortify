const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  spotifyId: String,
  cookieId: String
});

const User = mongoose.model('User', userSchema);

module.exports = User;
