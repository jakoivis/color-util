var webpack = require('webpack');
var path = require('path');
var name = 'ColorUtil';

var config = {
    entry: [
        __dirname + '/src/ColorUtil.js'
    ],
    devtool: 'source-map',
    output: {
        path: __dirname + '/dist',
        filename: name + '.min.js',
        publicPath: '/',
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
    plugins: [
    ]
};

module.exports = config;