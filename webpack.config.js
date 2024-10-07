const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'main.js',
        publicPath: '/'
    },
    devServer: {
        watchFiles: path.resolve(__dirname, "src"),
        port: 8080,
        open: true,
        historyApiFallback: true
    },
    plugins: [
        new HtmlWebpackPlugin({
          template: path.resolve(__dirname, 'src', 'template.html'),
          filename: 'index.html',
        }),
        new MiniCssExtractPlugin({
          filename: '[name].css',
        }),
        new webpack.DefinePlugin({
          'process.env.REACT_APP_API_URL': JSON.stringify(process.env.REACT_APP_API_URL),
        }),
    ],
    module: {
        rules: [
          {
            test: /\.(js|jsx)$/,
            use: 'babel-loader',
            exclude: /node_modules/
          },
          {
            test: /\.(scss|css)$/,
            use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader'],
          },
          {
            test: /\.(png|jpg|jpeg|gif)$/i,
            type: 'asset/resource',
          },
          {
            test: /\.svg$/,
            type: 'asset/resource',
            generator: {
               filename: path.join('icons', '[name][ext]'),
            },
          }
        ]
    },
}