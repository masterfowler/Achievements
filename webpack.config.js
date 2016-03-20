var path = require('path');
var npm_dir = __dirname + '/node_modules';

var config = {
  addVendor: function (name, path) {
    this.resolve.alias[name] = path;
    this.module.noParse.push(new RegExp(path));
  },
  entry: ['./src/assets/scripts/main.jsx'],
  resolve: { 
    alias: {
        style: path.join(__dirname, './src/assets/styles/'),
        image: path.join(__dirname, './src/assets/images/')
    }
  },
  output: {
    path: './build',
    filename: 'bundle.js'
  },
  eslint: {
    configFile: __dirname + '/.eslintrc',
    emitError: true
  },
  module: {
    noParse: [
    ],
    preLoaders: [
        { test: /\.js$/, include: __dirname + './src/assets/scripts/', loader: 'eslint-loader' }
    ],
    loaders: [
      { test: /\.(js|jsx)$/, loader: 'babel-loader', query: {presets: ['react', 'es2015']}},
      { test: /\.scss$/, loader: 'style!css!sass'},
      { test: /\.css$/, loader: 'style!css' },
      { test: /\.(png|jpg)$/, loader: 'url?limit=25000'},
      { test: /\.(svg|woff|woff2|eot|ttf)$/, loader: 'file-loader' }
    ]
  }
};

config.addVendor('react', npm_dir + '/react/dist/react.js');
config.addVendor('react-dom', npm_dir + '/react-dom/dist/react-dom.min.js');
config.addVendor('jquery', npm_dir + '/jquery/dist/jquery.min.js');
config.addVendor('bootstrap', npm_dir + '/bootstrap/dist/js/bootstrap.min.js');
config.addVendor('bootstrap.css', npm_dir + '/bootstrap/dist/css/bootstrap.min.css');
config.addVendor('react-bootstrap', npm_dir + '/react-bootstrap/dist/react-bootstrap.min.js');

module.exports = config;
