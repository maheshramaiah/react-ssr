const webpack = require('webpack');
const path = require('path');
const webpackNodeExternals = require('webpack-node-externals');
const merge = require('webpack-merge');
const common = require('./webpack.common');

module.exports = merge(common, {
  target: 'node',
  entry: './server.js',
  output: {
    path: path.join(__dirname, '../build'),
    filename: 'bundle.js'
  },
  externals: [webpackNodeExternals()],
  plugins: [
    new webpack.DefinePlugin({
      isBrowser: false
    })
  ]
});