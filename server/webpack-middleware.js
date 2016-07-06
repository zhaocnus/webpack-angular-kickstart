'use strict';

import path  from 'path';
import webpack  from 'webpack';
import webpackMiddleware  from 'webpack-dev-middleware';

const webpackConfig = require('../webpack.dev');

export default function(app) {
  let compiler = webpack(webpackConfig);
  let middleware = webpackMiddleware(compiler, {
    publicPath: '/',
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false
    }
  });

  app.use(middleware);

  // serve single page app
  app.route('/*')
    .get((req, res, next) => {
      let filename = path.join(compiler.outputPath, 'index.html');

      compiler.outputFileSystem.readFile(filename, (err, result) => {
        if (err) {
          return next(err);
        }

        res.set('content-type','text/html');
        res.send(result);
        res.end();
      });
    });
}