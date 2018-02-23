const webpack = require('webpack');
const path = require('path');
const WebpackCleanupPlugin = require('webpack-cleanup-plugin');

const name = 'chat-component';

const config = {
  context: __dirname,
  entry: './src/index.js',
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: `${name}.min.js`,
    library: name,
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    rules: [
      {
        test: /(\.js)$/,
        loader: 'babel-loader',
        exclude: /(node_modules)/,
        query: { cacheDirectory: true }
      }
    ]
  },
  externals: {
    react: 'react'
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false },
      output: { comments: false },
      screw_ie8: true,
      sourceMap: true
    }),
    new WebpackCleanupPlugin()
  ]
};

module.exports = config;
