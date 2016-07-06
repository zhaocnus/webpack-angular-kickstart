'use strict';

const webpack = require('webpack');
const path = require('path');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// NO dest is required because we are using webpack-dev-middleware
// No files are written to disk, it handle the files in memory
const SRC = path.join(__dirname, 'client/');

const config = {
  devtool: 'eval-source-map',
  entry: {
    vendor: path.join(SRC, 'vendor.js'),
    app: path.join(SRC, 'index.js')
  },
  output: {
    path: '/',
    filename: '[name].bundle.js'
  },
  module : {
    preLoaders: [
      {
        test: /\.js$/,
        loader: 'eslint',
        include: [
          path.resolve(__dirname, 'client/app')
        ]
      }
    ],
    loaders: [
      {
        test: /\.js$/,
        include: SRC,
        loaders: ['ng-annotate', 'babel']
      },
      {
        test: /\.scss$/,
        loaders: ['style', 'css', 'postcss', 'sass']
      },
      {
        test: /\.css$/,
        loaders: ['style', 'css', 'postcss']
      },
      {
        test: /.*\.(gif|png|jpe?g|svg)$/i,
        loaders: [
          'file?hash=sha512&digest=hex&name=img/[hash].[ext]',
          'image-webpack?{progressive:true, optimizationLevel: 7, interlaced: false, pngquant:{quality: "65-90", speed: 4}}'
        ]
      },
      {
        test: /\.html$/,
        loader: 'raw'
      },
      {
        test: /\.woff($|\?)|\.woff2($|\?)|\.ttf($|\?)|\.eot($|\?)/,
        loader: 'url'
      }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: 2
    }),
    new HtmlWebpackPlugin({
      template: path.join('./client/index.tpl.html'),
      inject: 'body',
      filename: 'index.html'
    })
  ],
  resolve: {
    root: SRC
  },
  postcss: [
    autoprefixer({ browsers: ['last 2 version'] })
  ]
};

module.exports = config;