/**
 * Express configuration
 */
import express from 'express';
import favicon from 'serve-favicon';
import morgan from 'morgan';
import compression from 'compression';
import bodyParser from 'body-parser';
import errorHandler from 'errorhandler';
import path from 'path';
import cookieParser from 'cookie-parser';
import methodOverride from 'method-override';
import config from './environment';
/*
import mongoose from 'mongoose';
import session from 'express-session';
import connectMongo from 'connect-mongo';
import lusca from 'lusca';
const MongoStore = connectMongo(session);
*/

export default function(app) {
  let env = app.get('env');

  app.set('appPath', path.join(config.root, 'client'));

  app.use(compression());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(methodOverride());
  app.use(cookieParser());

  // Persist sessions with MongoStore
  // Required by lusca
  /*
  app.use(session({
    secret: config.secrets.session,
    saveUninitialized: true,
    resave: false,
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
      db: 'octane-leaderboard-session'
    })
  }));
  */

  /**
   * Lusca - express server security
   * https://github.com/krakenjs/lusca
   */
  /*
  if (env !== 'test' && !process.env.SAUCE_USERNAME) {
    app.use(lusca({
      csrf: {
        angular: true
      },
      xframe: 'SAMEORIGIN',
      hsts: {
        maxAge: 31536000, // 1 year, in seconds
        includeSubDomains: true,
        preload: true
      },
      xssProtection: true
    }));
  }
  */

  if ('production' === env) {
    app.use(favicon(path.join(config.root, 'client', 'favicon.ico')));
    app.use(express.static(app.get('appPath')));
    app.use(morgan('dev'));
  }

  if ('development' === env || 'test' === env) {
    app.use(express.static(app.get('appPath')));
    app.use(morgan('dev'));
    app.use(errorHandler()); // Error handler - has to be last
  }
}
