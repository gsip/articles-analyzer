// eslint-disable-next-line @typescript-eslint/no-var-requires
const { CheckerPlugin } = require('awesome-typescript-loader');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { optimize } = require('webpack');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { join } = require('path');
const prodPlugins = [];

if (process.env.NODE_ENV === 'production') {
    prodPlugins.push(new optimize.AggressiveMergingPlugin(), new optimize.OccurrenceOrderPlugin());
}
module.exports = {
    mode: process.env.NODE_ENV,
    devtool: 'inline-source-map',
    entry: {
        contentscript: join(__dirname, 'src/contentscript/contentscript.ts'),
        background: join(__dirname, 'src/background/background.ts'),
    },
    output: {
        path: join(__dirname, 'dist'),
        filename: '[name].js',
    },
    module: {
        rules: [
            {
                exclude: /node_modules/,
                test: /\.ts?$/,
                use: 'awesome-typescript-loader?{configFileName: "tsconfig.json"}',
            },
            {
                test: /\.scss$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
            },
        ],
    },
    plugins: [
        new CheckerPlugin(),
        ...prodPlugins,
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css',
        }),
    ],
    resolve: {
        extensions: ['.ts', '.js'],
    },
};
