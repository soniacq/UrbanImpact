const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/main.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        clean: true, // Cleans the dist folder on build
    },
    devServer: {
        static: path.resolve(__dirname, 'public'), // Serve content from the public folder
        port: 3000,
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'], // Handle CSS files
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html', // Point directly to root index.html
        }),
    ],
    mode: 'development',
};
