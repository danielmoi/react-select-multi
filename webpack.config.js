const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const precss = require('precss');
const autoprefixer = require('autoprefixer');
const postcssImport = require('postcss-import');

module.exports = {
  context: path.resolve(__dirname, './'),
  entry: {
    app: ['./src/index'],
  },
  output: {
    path: path.resolve(__dirname, 'lib'),
    publicPath: 'http://localhost:3000/',
    filename: 'index.js',
    library: 'reactSelectMulti',
    libraryTarget: 'umd',
  },
  externals: {
    react: 'react',
    'react-redux': 'react-redux',
  },
  resolve: {
    extensions: ['.js', '.json', '.jsx', '.css'],
    // symlinks: false,
    mainFields: ['browser', 'module', 'main'],
    modules: [
      path.resolve(__dirname, '../'),
      path.resolve(__dirname),
      'node_modules',
    ],
  },
  resolveLoader: {
    modules: [
      path.resolve(__dirname, '../'),
      'node_modules',
    ],
  },

  node: {
    fs: 'empty',
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
          use: [
            {
              loader: 'css-loader',
              options: {
                modules: true,
                importLoaders: 1,
                localIdentName: 'rsm-[local]',
                sourceMap: true,
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: [
                  postcssImport({
                    addDependencyTo: webpack,
                  }),
                  autoprefixer(),
                  precss(),
                ],
                sourceMap: true,
              },
            },
          ],
        }),
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new ExtractTextPlugin('style.css'),
  ],
  devtool: 'source-map',
};
