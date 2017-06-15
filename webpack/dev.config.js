const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devtool: 'eval',
  context: path.resolve(__dirname, '..'),
  entry: [
    './src/index.js'
  ],
  output: {
    filename: '[name]-[hash].js',
    chunkFilename: '[name]-[chunkhash].js',
    path: path.resolve(__dirname, '../static/dist')
  },
  resolve: {
    modules: [
      'src',
      'node_modules'
    ],
    extensions: ['.js', '.json', '.jsx']
  },
  performance: {
    maxAssetSize: 1000000,
    maxEntrypointSize: 1000000,
  },
  devServer: {
    contentBase: './',
    port: 4000,
    noInfo: false,
    hot: true,
    inline: true,
    proxy: {
      '/': {
        bypass: function () {
          return '/static/index.html';
        }
      },
      '/api/search.json': {
        target: 'https://www.reddit.com',
        secure: false,
        changeOrigin: true
      }
    }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('development')
      }
    }),
    new HtmlWebpackPlugin({
      title: 'vinyl',
      filename: 'index.html',
      favicon: 'static/favicon.ico',
      template: 'static/index.html',
    }),
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules(?!\/simpler-redux-form)/, 
        loader: 'babel-loader'
      },
      { test: /\.(jpe?g|png|gif|svg)$/i, loaders: ['file-loader?hash=sha512&digest=hex&name=[hash].[ext]'] },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      }
    ]
  }
};
