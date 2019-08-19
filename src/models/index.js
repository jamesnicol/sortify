const mongoose = require('mongoose');
const Track = require('./track');

const { DB_PATH } = require('../../config');

mongoose.connect(DB_PATH, { useNewUrlParser: true });

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('mongoose doin shit');
})

module.exports = {
  Track
};
