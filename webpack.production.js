const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    mode: "production",
    entry: {
        contact: "./src/frontend/javascript/contact.js"
    },
    output: {
        filename: "[name].[contenthash].js",
        path: path.resolve(__dirname, './src/frontend/bundles'),
    }, 
    plugins: [
        new MiniCssExtractPlugin({filename: "[name].[contenthash].css"}),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            filename: "contact.html",
            template: "./src/frontend/html/contact.html",
        })
    ],
    module: {
        rules: [
            {
                test: /\.html$/,
                use: ["html-loader"]
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, "css-loader"]
            }
        ]
    }
}