const path = require('path'); 
const webpack = require('webpack'); 

module.exports = {
    mode: 'development',
    devtool: 'inline-source-map',
    entry: './src/index.ts',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname , 'dist/js'),
        publicPath: path.resolve(__dirname, '/js/'),
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    module: {
        rules: [
            {
                test: /\.ts?$/, 
                loader: 'ts-loader',
                exclude: /node_modules/ 
            }
        ]
    },
    devServer: {
        contentBase: './dist',
        port: 8080, 
    }
}
