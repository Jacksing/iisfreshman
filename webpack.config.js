var webpack = require('webpack');
var path = require('path');

// var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');

module.exports = {
    context: path.join(__dirname, './static/js'),
    entry: {
        trade: './trade.js',
        // entry2: './entry2.js'
    },
    output: {
        path: './static/app',
        filename: '[name].bundle.js'
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'babel-loader'
        }, {
            test: /\.jsx$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'babel-loader?presets[]=es2015!jsx-loader?harmony',
            // query: {
            //     presets: ['es2015']
            // }
        }]
    },
    // plugins: [commonsPlugin]
};