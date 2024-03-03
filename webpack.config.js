const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist/scripts'),
  },

  mode: 'development',
  devtool: 'inline-source-map',

  devServer: {
    static: './dist',
    open: {
      app: {
        name: 'google-chrome',
      },
    },
  },
};
