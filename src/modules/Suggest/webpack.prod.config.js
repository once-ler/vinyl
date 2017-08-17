var path = require('path');
var webpack = require('webpack');
var BASE_DIR = process.cwd();
var COMPONENT_FILE = 'vinyl-suggest-module';
var COMPONENT_NAME = 'VinylSuggestModule';
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

COMPONENT_FILE += '.min';

var config = {
  devtool: 'source-map',
  context: path.resolve(__dirname, '.'),
  entry: ['./index.js'],
  output: {
    path: path.join(__dirname, '/../../../dist'),
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
    'react-motion': {
      root: 'ReactMotion',
      commonjs2: 'react-motion',
      commonjs: 'react-motion',
      amd: 'react-motion',
    },
    'react-redux': {
      root: 'ReactRedux',
      commonjs2: 'react-redux',
      commonjs: 'react-redux',
      amd: 'react-redux',
    },
    'react-autosuggest': {
      root: 'ReactAutosuggest',
      commonjs2: 'react-autosuggest',
      commonjs: 'react-autosuggest',
      amd: 'react-autosuggest',
    },
    'redux': {
      root: 'Redux',
      commonjs2: 'redux',
      commonjs: 'redux',
      amd: 'redux',
    },
  },
};

module.exports = config;
