var path = require('path');
var webpack = require('webpack');
var BASE_DIR = process.cwd();
var COMPONENT_FILE = 'vinyl-scrollsync-module';
var COMPONENT_NAME = 'VinylScrollSyncModule';
var plugins = [
  new webpack.optimize.CommonsChunkPlugin({name: 'vendor', filename: 'vendor.bundle.js'}),
  new webpack.LoaderOptionsPlugin({
    minimize: true,
    debug: false
  }),
  new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify('production')
    }
  }),
  /*
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
  */
];

COMPONENT_FILE += '.min';

var config = {
  devtool: 'source-map',
  context: path.resolve(__dirname, '.'),
  entry: { app: ['./entry.js'],
  vendor: [
      // 'axios',
      'react',
      'react-dom',
      // 'react-router',
      'react-redux',
      // 'react-router-redux',
      'redux',
      // 'rxjs',
      // 'autosuggest-highlight',
      // 'history',
      // 'ie-version',
      // 'moment',
      // 'react-autosuggest',
      'react-collapse',
      // 'react-dropzone',
      'react-motion',
      // 'react-portal-minimal',
      'react-progress-2',
      // 'react-view-pager',
      'react-virtualized',
      // 'react-virtualized-select',
      'recompose',
      // 'redux-implicit-oauth2',
      // 'easy-react-form',
      'styled-components'
    ]
  },
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
      { test: /\.css$/, loader: 'style-loader!css-loader'},
      {
        test: /\.ttf$/,
        loader: "url-loader", // or directly file-loader
        // include: path.resolve(__dirname, "node_modules/react-native-vector-icons"),
      },
    ],
  },
  plugins: plugins,
  node: {
    net: 'empty',
    tls: 'empty',
    dns: 'empty'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.css'],
    alias: {
			'react': 'preact-compat',
			'react-dom': 'preact-compat'
    },
  },
  /**
  externals: {
    'react': {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'React',
    },
    'react-dom': {
      root: 'ReactDom',
      commonjs2: 'react-dom',
      commonjs: 'react-dom',
      amd: 'ReactDom',
    },
    'styled-components': {
      root: 'Styled',
      commonjs2: 'styled-components',
      commonjs: 'styled-components',
      amd: 'styled-components',
    },
    'react-virtualized': {
      root: 'ReactVirtualized',
      commonjs2: 'react-virtualized',
      commonjs: 'react-virtualized',
      amd: 'react-virtualized',
    },
    'react-motion': {
      root: 'ReactMotion',
      commonjs2: 'react-motion',
      commonjs: 'react-motion',
      amd: 'react-motion',
    },
    'react-collapse': {
      root: 'ReactCollapse',
      commonjs2: 'react-collapse',
      commonjs: 'react-collapse',
      amd: 'react-collapse',
    },
    'react-redux': {
      root: 'ReactRedux',
      commonjs2: 'react-redux',
      commonjs: 'react-redux',
      amd: 'react-redux',
    },
    'recompose': {
      root: 'Recompose',
      commonjs2: 'recompose',
      commonjs: 'recompose',
      amd: 'recompose',
    },
    'react-portal-minimal': {
      root: 'ReactPortal',
      commonjs2: 'react-portal',
      commonjs: 'react-portal',
      amd: 'react-portal',
    },
    
    'redux': {
      root: 'Redux',
      commonjs2: 'redux',
      commonjs: 'redux',
      amd: 'redux',
    },    
  },
  **/
};

module.exports = config;
