const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

/*
Remove select/datepicker (for now)
sed -i 's/select:/\/\/ select:/' node_modules/tcomb-form-native/lib/templates/bootstrap/index.js
sed -i 's/datepicker:/\/\/ datepicker:/' node_modules/tcomb-form-native/lib/templates/bootstrap/index.js
or
echo -e "import React from 'react'\nexport default () => <input type='date' />" > node_modules/tcomb-form-native/lib/templates/bootstrap/datepicker.js
echo -e "import React from 'react'\nexport default () => <select />" > node_modules/tcomb-form-native/lib/templates/bootstrap/select.js

cp src/components/Form/Native/Select.js node_modules/tcomb-form-native/lib/templates/bootstrap/select.js

// NOT NEEDED BELOW
sed -i 's/module.exports =/export default /' node_modules/tcomb-form-native/lib/index.js
sed -i 's/module.exports =/export default /' node_modules/tcomb-form-native/lib/components.js
sed -i 's/module.exports =/export default /' node_modules/tcomb-form-native/lib/templates/bootstrap/index.js
sed -i 's/module.exports =/export default /' node_modules/tcomb-form-native/lib/stylesheets/bootstrap.js
sed -i 's/module.exports =/export default /' node_modules/tcomb-form-native/index.js
*/
module.exports = {
  devtool: 'eval',
  context: path.resolve(__dirname, '..'),
  entry: [
    'babel-polyfill',
    './src/index.js'
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
        exclude: /node_modules(?!\/easy-react-form)(?!\/simpler-redux-form)(?!\/react-native-responsive-grid)(?!\/tcomb-form-native)/, 
        loader: 'babel-loader'
      },
      { test: /\.(jpe?g|png|gif|svg)$/i, loaders: ['file-loader?hash=sha512&digest=hex&name=[hash].[ext]'] },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.ttf$/,
        loader: "url-loader", // or directly file-loader
        include: path.resolve(__dirname, "node_modules/react-native-vector-icons"),
      },
    ]
  }
};
