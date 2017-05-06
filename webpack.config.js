const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  context: path.resolve(__dirname, './'),
  entry: {
    app: ['./src/index'],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: 'http://localhost:3000/',
    filename: 'react-select-multi.js',
    library: 'reactSelectMulti',
    libraryTarget: 'umd',
  },
  module: {
    loaders: [
      {
        test: /\.js(x?)$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader?modules&localIdentName=rsm__[local]___[hash:base64:5]',
          // options: {
          //   modules: true,
          // },
        }),
      },
    ],
  },
  plugins: [
    new ExtractTextPlugin('style.css'),
  ],
};
