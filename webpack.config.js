var webpack = require('webpack')
var path = require('path')

// var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js')

module.exports = {
    context: path.join(__dirname, './static/vender'),
    // contentBase: '',
    entry: {
        'approach-app': [
            './ApproachApp',
        ],
        'express-app': './ExpressApp',
    },
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
                presets: ['es2015', 'stage-0']
            }
        }, {
            test: /\.jsx$/,
            exclude: /(node_modules|bower_components)/,
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
    ],
    externals: {
        'jquery': 'jQuery',
        'react': 'React',
        'react-dom': 'ReactDOM',
        'redux': 'Redux',
        'react-redux': 'ReactRedux',
    },
}