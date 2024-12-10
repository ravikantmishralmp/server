const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: './src/server.ts', // Entry point of the application
  target: 'node', // Node.js environment
  externals: [nodeExternals()], // Exclude node_modules from the bundle
  resolve: {
    extensions: ['.ts', '.js'], // Resolve .ts and .js files
  },
  module: {
    rules: [
      {
        test: /\.ts$/, // Use Babel loader for .ts files
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', { targets: { node: '14' } }], // Target Node.js 14+
              '@babel/preset-typescript', // TypeScript support
            ],
          },
        },
      },
    ],
  },
};
