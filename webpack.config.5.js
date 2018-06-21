const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');

const config = {
    entry: {
        index: './src/five_layer/index.js',
        vendor: [
           'lodash',
           'jquery'
        ]
    },
    devtool: 'inline-source-map',
    externals: {
    },
    module: {
        noParse: function(content) {
            return /jquery|lodash/.test(content);
        },
        rules: [{
            test: /\.js$/,
            use: {
                loader: 'babel-loader'
            },
            exclude: /node_modules/
        },
        {
            test: /\.css$/,
            //use: ['style-loader', 'css-loader'],
            use: ExtractTextPlugin.extract({
                use: 'css-loader'
            }),
            exclude: /node_modules/
        },
        {
            test: /\.(png|svg|jpg|gif)$/,
            use: [
                'file-loader'
            ],
            exclude: /node_modules/
        }]
    },
    devServer: {
        headers: {
            "X-Custom-Foo": "bar"
        },
        //historyApiFallback: {
        //    rewrites: [
        //        { from: /^\/$/, to: '/index.html' },
        //        { from: /^\/subpage/, to: '/index.html' },
        //        { from: /./, to: '/index.html' }
        //    ]
        //},
        //https: true,
        //open: true,
        //openPage: 'different/page',
        //publicPath: "/aa/",
        overlay: true,
        inline: true,
        historyApiFallback: true,
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        host: '0.0.0.0',
        disableHostCheck: true,
        hot: true
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            template:'./src/five_layer/index.html',
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor'
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'runtime'
        }),
        new webpack.NamedModulesPlugin(),
        new ExtractTextPlugin('[name].[contenthash].css'),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
            'window.$': 'jquery',
            'window._': 'lodash',
            '_': 'lodash'
        })
    ],
    output: {
        filename: '[name].bundle.js',
        publicPath: process.env.NODE_ENV === 'development' ? "/" : '',
        path: path.resolve(__dirname, 'dist'),
    }
};

if (process.env.NODE_ENV === 'development') {
    config.devtool = "inline-source-map"
    config.plugins.push(new webpack.HotModuleReplacementPlugin())
} else {
    config.performance = {
        hints: "error",
        maxAssetSize: 2500000
    }
    config.output.chunkFilename = '[name].[chunkhash].js'
    config.output.filename = '[name].[chunkhash].js' // 生产环境使用
    config.plugins.push(new webpack.optimize.UglifyJsPlugin({
        compress: process.env.NODE_ENV === 'production'
    }))
}

module.exports = config;