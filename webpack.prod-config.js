var WebpackStripLoader = require('strip-loader');
var path = require('path');
var devConfig = require('./webpack.dev-config.js');
var webpack = require('webpack');


var stripLoader = {
    test: /\.js$/,
    exclude: /node_modules/,
    loader: WebpackStripLoader.loader('console.log')
};

var prodConfig = devConfig;

prodConfig.module.loaders.push(stripLoader);
prodConfig.output = {
    path: __dirname + "/dist",
    filename: "[name].min.js"
};
prodConfig.plugins.push(new webpack.DefinePlugin({
    'process.env': {
        'NODE_ENV': '"production"'
    }
}));
prodConfig.plugins.push(new webpack.optimize.UglifyJsPlugin());
module.exports = prodConfig;