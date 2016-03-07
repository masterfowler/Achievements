
var config = {
  addVendor: function (name, path) {
    this.resolve.alias[name] = path;
    this.module.noParse.push(new RegExp(path));
  },
  entry: ['./src/assets/scripts/main.jsx'],
  output: {
    path: './build',
    filename: 'bundle.js'
  },
  module: {
    noParse: [
    ],
    loaders: [
      { test: /\.(js|jsx)$/, loader: 'babel-loader', query: {presets: ['react', 'es2015']}}
    ]
  }
};

module.exports = config;
