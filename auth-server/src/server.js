'use strict';

// 3rd Party Resources
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

// Esoteric Resources
const errorHandler = require('./auth/error-handlers/500');
const notFound = require('./auth/error-handlers/404');
const authRoutes = require('./auth/routes.js');
const logger = require('../src/auth/middleware/logger');
const acl = require('./auth/middleware/acl');
const bearer = require('./auth/middleware/bearer');

// Prepare the express app
const app = express();

// App Level MW
const v1Routes = require('./auth/routes/v1');
const v2Routes = require('./auth/routes/v2');
app.use(logger);
app.use(cors());
app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/v1', v1Routes);
app.use('/api/v2', bearer, acl('read'), v2Routes);

// Routes
app.use(authRoutes);

// Catchalls
app.use(notFound);
app.use(errorHandler);

module.exports = {
  server: app,
  start: port => {
    if (!port) { throw new Error('Missing Port'); }
    app.listen(port, () => console.log(`Listening on ${port}`));
  },
};
