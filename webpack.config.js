const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    devServer: {
        contentBase: ['./dist']
    },
    entry: [
        './src/scss/styles.scss',
        './src/ts/workflowDesigner.ts'
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'index.js',
        library: 'workflow-designer',
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [{
                        loader: "css-loader",
                        options: {
                            sourceMap: true
                        }
                    }, {
                        loader: "sass-loader",
                        options: {
                            sourceMap: true
                        }
                    }]
                  })
            },
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                loader: 'ts-loader'
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin("index.css")
    ]
  }