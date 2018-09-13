const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  context: path.resolve(__dirname, '../../../'),
  entry: {
    app: [ './src/modules/SuggestApp/index.js' ],
    vendor: [
      'axios',
      'react',
      'react-dom',
      'react-router',
      'react-redux',
      'react-router-redux',
      'redux',
      'rxjs',
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
    path: path.resolve(__dirname, '../../../examples/suggestApp/suggest'),
    publicPath: '/suggest/'
  },
  // progress: true,
  resolve: {
    modules: [
      'src',
      'node_modules'
    ],
    extensions: ['.js', '.json', '.jsx']
  },  
  plugins: [
    // new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.CommonsChunkPlugin(["vendor", "vendor.bundle.js"]),
    new webpack.NoEmitOnErrorsPlugin(),
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
      title: 'vinyl-suggest-app',
      filename: 'index.html',
      template: './static/index.html'
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
        loader: 'style-loader!css-loader'
      }
    ]
  }
};
