const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  context: path.resolve(__dirname, '..'),
  entry: {
    app: [ './src/index.js' ],
    vendor: [
      'axios',
      'react',
      'react-dom',
      'react-router',
      'react-redux',
      'react-router-redux',
      'redux',
      'rxjs',
      'autosuggest-highlight',
      'history',
      'ie-version',
      'moment',
      'react-autosuggest',
      'react-collapse',
      'react-dropzone',
      'react-motion',
      'react-portal-minimal',
      'react-progress-2',
      'react-view-pager',
      'react-virtualized',
      'react-virtualized-select',
      'recompose',
      'redux-implicit-oauth2',
      'simpler-redux-form',
      'styled-components'
    ]
  },
  output: {
    filename: '[name]-[chunkhash].js',
    chunkFilename: '[name]-[chunkhash].js',
    path: path.resolve(__dirname, '../dist')
  },
  progress: true,
  resolve: {
    modulesDirectories: [
      'src',
      'node_modules'
    ],
    extensions: ['', '.js', '.json', '.jsx']
  },  
  plugins: [
    // new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.CommonsChunkPlugin("vendor", "vendor.bundle.js"),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    }),
    new HtmlWebpackPlugin({
      title: 'vinyl',
      filename: 'index.html',
      template: 'static/index.html'
    }),
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader?modules'
      }
    ]
  }
};
