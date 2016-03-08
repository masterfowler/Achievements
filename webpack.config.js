var npm_dir = __dirname + '/node_modules';

var config = {
  addVendor: function (name, path) {
    this.resolve.alias[name] = path;
    this.module.noParse.push(new RegExp(path));
  },
  entry: ['./src/assets/scripts/main.jsx'],
  resolve: { 
    alias: {
    }
  },
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

config.addVendor('react', npm_dir + '/react/dist/react.min.js');
config.addVendor('react-dom', npm_dir + '/react-dom/dist/react-dom.min.js');
config.addVendor('jquery', npm_dir + '/jquery/dist/jquery.min.js');
config.addVendor('bootstrap', npm_dir + '/bootstrap/dist/js/bootstrap.min.js');
config.addVendor('bootstrap.css', npm_dir + '/bootstrap/dist/css/bootstrap.min.css');
config.addVendor('react-bootstrap', npm_dir + '/react-bootstrap/dist/react-bootstrap.min.js');

module.exports = config;
