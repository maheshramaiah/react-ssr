const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common');

module.exports = merge(common, {
  target: 'web',
  entry: './client/index.js',
  output: {
    path: path.join(__dirname, '../public'),
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.DefinePlugin({
      isBrowser: true
    })
  ]
});