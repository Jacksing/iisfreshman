var webpack = require('webpack');
var path = require('path');

// var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');

module.exports = {
    context: path.join(__dirname, './static/vender/js'),
    entry: {
        'test-helper': './test-helper.js',
    },
    output: {
        path: './static/bundle/js',
        filename: '[name].bundle.js'
    },
    resolve: {
        extensions: ['', '.js', '.jsx', '.scss']
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'babel-loader',
            query: {
                presets: ['es2015']
            }
        }, {
            test: /\.jsx$/,
            exclude: /(node_modules|bower_components)/,
            // loader: 'babel-loader?presets[]=es2015!jsx-loader?harmony',
            loader: 'babel-loader',
            query: {
                presets: ['es2015', 'react']
            }
        }, {
            test: /\.scss$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'style-loader!css-loader!sass-loader',
        }]
    },
    // plugins: [commonsPlugin]
};