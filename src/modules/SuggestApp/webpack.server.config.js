const path = require('path');
const webpack = require('webpack');
const fs = require('fs');

let nodeModules = {};
fs.readdirSync('node_modules')
  .filter(x => {
    return [ '.bin' ].indexOf(x) === -1;
  })
  .forEach(mod => {
    nodeModules[mod] = 'commonjs ' + mod;
  });

module.exports = {
  context: path.resolve(__dirname, '../../../'),
  entry: './src/modules/SuggestApp/server.js',
  output: {
    filename: 'server.js',
    path: path.resolve(__dirname, '../../../examples/suggestApp')
  },
  resolve: {
    modules: [ 'node_modules' ],
    extensions: [ '.js' ]
  },
  target: 'node',
  externals: nodeModules,
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    }),
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  }
};
