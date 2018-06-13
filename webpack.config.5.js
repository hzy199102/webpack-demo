const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');

module.exports = {
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
            })
        },
        {
            test: /\.(png|svg|jpg|gif)$/,
            use: [
                'file-loader'
            ]
        }]
    },
    devServer: {
        contentBase: './dist',
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
        new webpack.HotModuleReplacementPlugin(),
        new ExtractTextPlugin('styles.css'),
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
        //filename: '[name].[chunkhash].js', // 生产环境使用
        filename: '[name].bundle.js',
        //chunkFilename: '[name].[chunkhash].js',
        path: path.resolve(__dirname, 'dist'),
    }
};