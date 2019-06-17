const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
  devtool: 'eval',
  context: path.resolve(__dirname, '..'),
  entry: [
    'babel-polyfill',
    './src/modules/SearchLogApp/index.dev.js'
  ],
  output: {
    filename: '[name]-[hash].js',
    chunkFilename: '[name]-[chunkhash].js',
    path: path.resolve(__dirname, '../static/dist')
  },
  resolve: {
    alias: {
      'react-native': 'react-native-web'
    },
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
      '/api/reddit/**': {
        target: 'https://www.reddit.com',
        pathRewrite: {
          '^/api/reddit': ''
        },
        secure: false,
        changeOrigin: true
      },
      '/api/pubmed/**': {
        target: 'https://eutils.ncbi.nlm.nih.gov',
        pathRewrite: {
          '^/api/pubmed': ''
        },
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
        exclude: /node_modules(?!\/react-native-responsive-grid)/, 
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

module.exports = config
