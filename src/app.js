const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const cookieSession = require('cookie-session');
const routes = require('./routes');
const errorHandler = require('./middleware/errorHandler');
const authentication = require('./middleware/authentication');

const app = express();

app.use(cors());
app.use(helmet());
app.use(
  cookieSession({
    name: 'spot-session',
    secret: 'changemesecret'
  })
);

app.use(express.static(`${__dirname}/static`));

app.use(errorHandler);
app.use(authentication);
app.use(routes);

module.exports = app;
