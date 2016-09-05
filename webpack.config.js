var webpack = require('webpack');
var path = require('path');

// var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');

module.exports = {
    context: path.join(__dirname, './static/vender'),
    // contentBase: '',
    // entry: {
    //     'test-helper': './test-helper',
    // },
    entry: [
        'webpack-dev-server/client?http://localhost:3000/', // WebpackDevServer host and port
        'webpack/hot/only-dev-server', // "only" prevents reload on syntax errors
        // './test-helper',
        './',
    ],
    output: {
        // path: './static/bundle/js',
        path: require('path').resolve('./static/bundle/js'),
        filename: '[name].bundle.js',
        publicPath: '/static/bundle/js/',
        // hotUpdateChunkFilename: 'hot/[id].[hash].hot-update.js',
        // hotUpdateMainFilename: 'hot/[hash].hot-update.json',
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
            // (1)
            // loader: 'babel-loader?presets[]=es2015!jsx-loader?harmony',
            // (2)
            // loader: 'babel-loader',
            // query: {
            //     presets: ['es2015', 'react', 'stage-0']
            // }
            loaders: [
                'react-hot-loader/webpack',
                'babel?presets[]=es2015&presets[]=react&presets[]=stage-0',
            ]
        }, {
            test: /\.scss$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'style-loader!css-loader!sass-loader',
        }]
    },
    // plugins: [commonsPlugin]
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
};