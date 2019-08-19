const mongoose = require('mongoose');
let trackSchema = new mongoose.Schema({
  name: String,
  spotifyUri: String,
});

const Track = mongoose.model('Track', trackSchema);

module.exports = Track;