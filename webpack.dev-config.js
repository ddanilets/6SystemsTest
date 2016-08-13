var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
   entry: {
       bundle: "./src/reservation/index"
   },
   output: {
       path: __dirname + "/dist",
       filename: "[name].js"
   },
   module: {
      loaders: [
        {
          test: /.js?$/,
          loader: 'babel-loader',
          exclude: /node_modules/,
          query: {
            presets: ['es2015', 'react']
          }
        },
          {
              test: /\.css$/,
              loader: ExtractTextPlugin.extract("style-loader", "css-loader")
          }
      ]
    },
    plugins: [
        new ExtractTextPlugin("[name].css")
    ]
};