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
                { from: "./node_modules/fontawesome-free/css/all.min.css", to: "css" },
                { from: "./node_modules/fontawesome-free/webfonts", to: "webfonts" },
                { from: "./node_modules/bootstrap/dist/css/bootstrap.min.css", to: "css" },
                { from: "./node_modules/bootstrap-icons/font/bootstrap-icons.min.css", to: "css" },
                { from: "./node_modules/fontawesome-free/js/fontawesome.min.js", to: "js" },
                { from: "./node_modules/bootstrap/dist/js/bootstrap.min.js", to: "js" },
                { from: "./node_modules/bootstrap/dist/js/bootstrap.bundle.min.js", to: "js" },
                { from: "./node_modules/startbootstrap-simple-sidebar/dist/css/styles.css", to: "css" },
                { from: "./node_modules/startbootstrap-simple-sidebar/dist/js/scripts.js", to: "js" },
                { from: "./node_modules/chart.js/dist/chart.umd.js", to: "js" },
                { from: "./node_modules/pikaday/pikaday.js", to: "js" },
                { from: "./node_modules/moment/min/moment.min.js", to: "js" },
                { from: "./node_modules/pikaday/css/pikaday.css", to: "css" },
            ],
        }),
    ],
};