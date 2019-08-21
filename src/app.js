const express = require('express');
const routes = require('./routes');
const errorHandler = require('./middleware/errorHandler');
const authentication = require('./middleware/authentication');

// const { Track } = require('./models');
// console.log(typeof Track);

const app = express();

app.use(errorHandler);
app.use(authentication);
app.use(routes);

module.exports = app;
