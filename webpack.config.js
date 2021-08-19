const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
    mode: 'production',
    entry: {
        main: './src/index.js',
    },
    output: {
        filename: 'vue-identidy-comp.js',
        library: 'inentifyComp'
    },
    devServer: {
        port: 9000,
        open: true
    },
    plugins: [
        // new HtmlWebpackPlugin({
        //     template: './public/index.html'
        // })
    ],
    module: {
        rules: [{
            exclude: /src/,
            use: {
                loader: 'babel-loader',
                options: {
                    plugins: ["@babel/plugin-transform-runtime"]
                }
            }
        }]
    }
}
