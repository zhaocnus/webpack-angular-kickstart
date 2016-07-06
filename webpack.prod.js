'use strict';

const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const DEST = path.join(__dirname, 'dist/');

let config = require('./webpack.dev.js');

config.devtool = null;

config.output = {
  path: DEST,
  filename: '[name]-[hash].js'
};

config.plugins = [
  new webpack.optimize.OccurenceOrderPlugin(),
  new HtmlWebpackPlugin({
    template: path.join('./client/index.tpl.html'),
    inject: 'body',
    filename: 'index.html'
  }),
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    minChunks: 2
  }),
  new webpack.optimize.UglifyJsPlugin({
    sourceMap: false,
    mangle: false,
    compress: { warnings: false }
  }),
  new CopyWebpackPlugin([
    { from: 'favicon.ico', context: './client/'},
    { from: 'apple-touch-icon.png', context: './client/'}
  ], {
    ignore: [
      { glob: '**/.DS_Store' }
    ]
  })
];

module.exports = config;