const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist/scripts'),
  },

  mode: "production",

  devServer: {
    static: './dist',
    open: {
      app: {
        name: 'google-chrome',
      },
    },
  },
};
