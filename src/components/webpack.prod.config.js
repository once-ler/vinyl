var path = require('path');
var webpack = require('webpack');
var BASE_DIR = process.cwd();
var COMPONENT_FILE = 'vinyl-components';
var COMPONENT_NAME = 'VinylComponents';
var plugins = [
  new webpack.LoaderOptionsPlugin({
    minimize: true,
    debug: false
  }),
  new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify('production')
    }
  }),
  new webpack.optimize.UglifyJsPlugin({
    sourceMap: true,
    beautify: false,
    mangle: {
      screw_ie8: true,
      keep_fnames: true
    },
    compress: {
      screw_ie8: true
    },
    comments: false
  })
];

function getPackageMain() {
  return require(path.resolve(BASE_DIR, 'package.json')).main;
}

COMPONENT_FILE += '.min';

var config = {
  devtool: 'sourcemap',
  // entry: path.resolve(BASE_DIR, getPackageMain()),
  context: path.resolve(__dirname, '.'),
  entry: ['./index.js'],
  output: {
    path: path.join(__dirname, '/../../dist'),
    publicPath: 'dist/',
    filename: COMPONENT_FILE + '.js',
    sourceMapFilename: COMPONENT_FILE + '.map',
    library: COMPONENT_NAME,
    libraryTarget: 'umd',
  },
  module: {
    loaders: [
      { test: /\.(js|jsx)/, exclude: /node_modules/, loader: 'babel-loader'},
      { test: /\.css$/, loader: 'style-loader!css-loader'} 
    ],
  },
  plugins: plugins,
  resolve: {
    extensions: ['.js', '.jsx', '.css'],
  },
  externals: {
    'react': {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react',
    },
    'react-dom': {
      root: 'ReactDom',
      commonjs2: 'react-dom',
      commonjs: 'react-dom',
      amd: 'react-dom',
    },
    'styled-components': {
      root: 'Styled',
      commonjs2: 'styled',
      commonjs: 'styled',
      amd: 'styled',
    },
    'react-virtualized': {
      root: 'ReactVirtualized',
      commonjs2: 'react-virtualized',
      commonjs: 'react-virtualized',
      amd: 'react-virtualized',
    },
    'react-virtualized-select': {
      root: 'ReactVirtualizedSelect',
      commonjs2: 'react-virtualized-select',
      commonjs: 'react-virtualized-select',
      amd: 'react-virtualized-select',
    },
    'react-motion': {
      root: 'ReactMotion',
      commonjs2: 'react-motion',
      commonjs: 'react-motion',
      amd: 'react-motion',
    },    
  },
};

module.exports = config;
