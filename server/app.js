/**
 * Main application file
 */
import express from 'express';
import config from './config/environment';
import http from 'http';

// Setup server
let app = express();
let server = http.createServer(app);

// Setup mongoose
require('./config/mongoose');

// express config
require('./config/express').default(app);

// routes
require('./routes').default(app);

// Start server
function startServer() {
  app.octaneLeaderboardApp = server.listen(config.port, config.ip, () => {
    console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
  });
}

setImmediate(startServer);

// Expose app
exports = module.exports = app;
