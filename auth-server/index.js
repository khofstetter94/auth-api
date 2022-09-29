'use strict';

require('dotenv').config();
const server = require('./src/server.js');
const { db } = require('./src/auth/models');

db.sync().then(() => {
  server.start(process.env.PORT || 3001);
});
