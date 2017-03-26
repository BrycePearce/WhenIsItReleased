const path = require('path');
const BUILD_DIR = path.resolve(__dirname, 'build/');

module.exports = {
  devtool: 'source-map',
  entry: ['./client/router.js'],
  output: {
    path: BUILD_DIR,
    filename: 'dvdInfo.js'
  },
  module: {
    loaders: [
      { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192' }, // inline base64 URLs for <=8k images, direct URLs for the rest
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react']
        }
      }]
  }
};