const express = require('express');
const cors = require('cors');
const cors = require('cookie-parser');
const routes = require('./routes');
const errorHandler = require('./middleware/errorHandler');
const authentication = require('./middleware/authentication');

const app = express();

app.use(express.static(`${__dirname}/static`));

app.use(cors());
app.use(errorHandler);
app.use(authentication);
app.use(routes);

module.exports = app;
