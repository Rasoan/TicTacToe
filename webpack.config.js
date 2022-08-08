const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const miniCss = require('mini-css-extract-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = function(env) {
    const isRunCleanWebpackPlugin = !env['noCleanWebpackPlugin'];

    return {
        entry: './index.ts',
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'bundle-[hash].js',
            clean: isRunCleanWebpackPlugin,
        },
        resolve: {
            extensions: ['.ts', '.js'],
        },
        devServer: {
            port: 3000,
            open: true,
            hot: false,
            liveReload: true,
            client: {
                progress: true,
            },
        },
        mode: 'development',
        devtool: 'source-map',
        module: {
            rules: [
                {
                    test: /\.ts?$/i,
                    loader: 'ts-loader',
                    exclude: /node_modules/,
                },
                {
                    test: /\.s[ac]ss$/i,
                    use: [
                        miniCss.loader,
                        "css-loader",
                        "sass-loader",
                    ],
                },
                // {
                //   test: /\.(svg|woff|woff2|ttf|eot|otf)([\?]?.*)$/,
                //   use: [
                //     {
                //       loader: 'file-loader?name=assets/fonts/[name].[ext]',
                //     },
                //   ],
                // },
            ],
        },
        plugins: [
            // new CopyWebpackPlugin({
            //     patterns: [
            //         {
            //             from: '**/*',
            //             context: path.resolve(__dirname, 'src', 'assets'),
            //             to: './assets',
            //         },
            //     ],
            // }),
            new HtmlWebpackPlugin({
                template: 'index.html',
                filename: 'index.html',
                minify: {
                    collapseWhitespace: true,
                    removeComments: true,
                    removeRedundantAttributes: true,
                    useShortDoctype: true,
                },
            }),
            new MiniCssExtractPlugin(),
        ],
    };
}
