const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'production',
  output: {
    filename: 'server.js', // Minified file for production
    path: __dirname + '/dist', // Output directory
    clean: true, // Clean the output directory before building
  },
});
