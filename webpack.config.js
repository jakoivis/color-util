var webpack = require('webpack');
var merge = require('webpack-merge');
var path = require('path');
var name = 'ColorUtil';

const PATHS = {
    index: path.join(__dirname, 'src/ColorUtil.js'),
    dist: path.join(__dirname, 'dist')
};

var config = {
    entry: [
        PATHS.index
    ],
    devtool: 'source-map',
    output: {
        path: PATHS.dist,
        filename: name + '.js',
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
    }
};

var devConfig = {
    devServer: {
        host: process.env.HOST,
        port: process.env.PORT,
        inline: true
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
};

var prodConfig = {
    output: {
        filename: name + '.min.js'
    }
};

module.exports = (env) => {

    if (env === 'development') {
        return merge(
            config,
            devConfig
        );
    }

    return merge(
        config,
        prodConfig
    );
}