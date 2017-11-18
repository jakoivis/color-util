var webpack = require('webpack');
var merge = require('webpack-merge');
var path = require('path');
var name = 'color-util';
var jsname = 'colorutil';

const PATHS = {
    index: path.join(__dirname, 'src/ColorUtil.js'),
    dist: path.join(__dirname, 'dist'),
    benchmarkIndex: path.join(__dirname, 'benchmark/index.js'),
    benchmarkDist: path.join(__dirname, 'benchmark-output')
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
        library: jsname,
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

var benchmarkConfig = {
    entry: [
        PATHS.benchmarkIndex
    ],
    devtool: 'source-map',
    output: {
        path: PATHS.benchmarkDist,
        filename: 'benchmark-bundle.js',
        publicPath: '/',
        library: 'benchmark',
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    module: {
        rules: [
            {
                test: /(\.jsx|\.js)$/,
                use: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(html|csv)$/,
                use: ['file-loader?name=/[name].[ext]']
                // loader: "file?name=[path][name].[ext]&context=./benchmark"
            }
        ]
    }
};

module.exports = (env) => {

    if (env === 'development') {
        return merge(
            config,
            devConfig
        );

    } else if (env === 'benchmark') {
        return benchmarkConfig;
    }

    return merge(
        config,
        prodConfig
    );
}