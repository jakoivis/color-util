var webpack = require('webpack');
var path = require('path');

var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
var isBuild = process.env.arg === "build";
var name = 'ColorUtil';
var plugins = [];

if (isBuild) {
    plugins.push(new UglifyJsPlugin({ minimize: true }));
}

var config = {
    entry: __dirname + '/src/ColorUtil.js',
    devtool: 'source-map',
    output: {
        path: __dirname + '/dist',
        filename: name + (isBuild ? '.min.js' : '.js'),
        publicPath: '/dist/',
        library: name,
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    module: {
        loaders: [
            {
                test: /(\.jsx|\.js)$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            }
        ]
    },
    plugins: plugins
};

module.exports = config;