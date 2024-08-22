const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    mode: 'development',
    entry: './src/app.js',
    output: {
        filename: 'app.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/'
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'public'),
        },
        compress: true,
        port: 9001,
        historyApiFallback: true,
    },
    module: {
        rules: [
            {
                test: /\.scss$/i,
                use: [
                    "style-loader",
                    "css-loader",
                    "sass-loader",
                ],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html',
            baseUrl: '/',
        }),
        new CopyPlugin({
            patterns: [
                { from: "./src/templates", to: "templates" },
                { from: "./src/static/images", to: "images" },
                { from: "./modules/all.min.css", to: "css" },
                { from: "./modules/webfonts", to: "webfonts" },
                { from: "./node_modules/bootstrap/dist/css/bootstrap.min.css", to: "css" },
                { from: "./node_modules/bootstrap-icons/font/bootstrap-icons.min.css", to: "css" },
                { from: "./modules/fontawesome.min.js", to: "js" },
                { from: "./node_modules/bootstrap/dist/js/bootstrap.min.js", to: "js" },
                { from: "./node_modules/bootstrap/dist/js/bootstrap.bundle.min.js", to: "js" },
                { from: "./modules/sidebars.css", to: "css" },
                { from: "./modules/sidebars.js", to: "js" },
                // { from: "./node_modules/chart.js/dist/chart.js", to: "js" },
                { from: "./modules/chart.js", to: "js" },
                // { from: "./src/components/layout.js", to: "js" },
            ],
        }),
    ],
};