const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const routes = require('./routes');
const errorHandler = require('./middleware/errorHandler');
const authentication = require('./middleware/authentication');

const app = express();

app.use(cors());
app.use(helmet());
// @TODO: security here?
app.use(cookieParser());

app.use(express.static(`${__dirname}/static`));

app.use(errorHandler);
app.use(authentication);
app.use(routes);

module.exports = app;
