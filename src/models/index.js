const mongoose = require('mongoose');
const Track = require('./track');
const User = require('./user');

const { DB_PATH } = require('../../config');

mongoose.connect(DB_PATH, { useNewUrlParser: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('mongoose doin shit');
});

module.exports = {
  Track,
  User
};
