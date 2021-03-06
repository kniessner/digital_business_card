var webpack = require('webpack');
var path = require('path');
var CleanWebpackPlugin = require("clean-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
var merge = require('webpack-merge');
var common = require('./webpack.common.js');
const UglifyJsPlugin = require("uglifyjs-webpack-plugin")


module.exports = merge(common, {
  output: {
    publicPath: "./"
  },
  devtool: "inline-source-map",
  devServer: {
    contentBase: path.resolve(__dirname, "dist"),
    port: 9000,
    disableHostCheck: true,
    host: "localhost"
  },
  plugins: [
    new OptimizeCssAssetsPlugin(
      {
        assetNameRegExp: /\.css$/,
        cssProcessor: require("cssnano"),
        cssProcessorOptions: { discardComments: { removeAll: true } },
        canPrint: true
      },
      {
        copyUnmodified: true
      }
    ),
    new UglifyJsPlugin({
      sourceMap: true,
      uglifyOptions: {
        ecma: 8,
        compress: {
          warnings: false,
          drop_console: true,
          booleans: false,
          loops: false
        },
        output: {
          comments: true,
          beautify: true
        }
      }
    }),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production")
      }
    })
  ]
});