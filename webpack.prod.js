const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = merge(common, {
    mode: "production",
    devtool: "source-map",
    optimization: {
        splitChunks: {
            chunks: "all",
            cacheGroups: {
                vendor: {
                  test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
                  name: 'vendors',
                  chunks: 'all',
                },
            },
        },
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "[name].[contentHash].css",
        }),
    ],
});