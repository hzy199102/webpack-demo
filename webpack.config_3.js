const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');

module.exports = {
    entry: {
        index: './src/index.js',
        another: './src/another-module.js'
    },
    devtool: 'eval',
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    //devServer: {
    //  contentBase: './dist',
    //    hot: true
    //},
    plugins: [
        //new webpack.HotModuleReplacementPlugin(),
        new CleanWebpackPlugin(['dist']),
        new ManifestPlugin(),
             new HtmlWebpackPlugin({
                   title: 'Code Splitting'
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common' // Specify the common bundle's name.
        })
   ],
};