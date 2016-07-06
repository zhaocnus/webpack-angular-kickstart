/**
 * Mongoose configuration
 */
import mongoose from 'mongoose';
import config from './environment';

// setup mongoose library
mongoose.Promise = require('bluebird');

// Connect to MongoDB
mongoose.connect(config.mongo.uri, config.mongo.options);
mongoose.connection.on('error', err => {
  console.error('MongoDB connection error: ' + err);
  process.exit(-1);
});

// Populate databases with sample data
if (config.seedDB) { require('./seed'); }