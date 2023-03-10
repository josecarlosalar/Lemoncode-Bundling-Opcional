const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const path = require("path");
const Dotenv = require('dotenv-webpack');

module.exports = merge(common, {
    mode: "development",
    performance: {
        hints: false,
        maxEntrypointSize: 512000,
        maxAssetSize: 512000,
    },
    module: {
        rules: [{
            test: /\.scss$/,
            exclude: /node_modules/,
            use: [
                "style-loader",
                {
                    loader: "css-loader",
                    options: {
                        modules: {
                            exportLocalsConvention: "camelCase",
                            localIdentName: "[path][name]__[local]--[hash:base64:5]",
                            localIdentContext: path.resolve(__dirname, "src"),
                        },
                    },
                },
                "sass-loader",
            ],
        }, ],
    },
    plugins: [
        new Dotenv({
            path: './dev.env',
        }),
    ],
    devtool: "eval-source-map",
    devServer: {
        port: 8080,
        open: true,
        hot: true,
        static: {
            directory: path.join(__dirname, "src"),
        },
        devMiddleware: {
            stats: "errors-only",
        },
    },
});