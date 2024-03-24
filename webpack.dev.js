const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    mode: "development",
    entry: {
        contact: "./src/frontend/javascript/contact.js"
    },
    output: {
        filename: "[name].bundle.js",
        path: path.resolve(__dirname, './src/frontend/bundles'),
    }, 
    plugins: [
        new HtmlWebpackPlugin({
            filename: "contact.html",
            template: "./src/frontend/html/contact.html",
        }),
        new CleanWebpackPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.html$/,
                use: ["html-loader"]
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            }
        ]
    }
}