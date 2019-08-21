const mongoose = require('mongoose');

const trackSchema = new mongoose.Schema({
  name: String,
  spotifyUri: String
});

const Track = mongoose.model('Track', trackSchema);

module.exports = Track;
