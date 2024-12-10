const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map', // Enable source maps for easier debugging
  output: {
    filename: 'server.js', // Output file for development
    path: __dirname + '/dist', // Output directory
  },
  watch: true, // Automatically rebuild on changes
  watchOptions: {
    ignored: /node_modules/, // Ignore changes in node_modules
    aggregateTimeout: 300, // Delay rebuild after the first change (ms)
    poll: 1000, // Polling interval for watching (useful for certain environments)
  },
});
