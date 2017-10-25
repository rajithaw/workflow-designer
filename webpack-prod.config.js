var config = require('./webpack.config');

const ExtractTextPlugin = require("extract-text-webpack-plugin");

const extractSass = new ExtractTextPlugin({
    filename: "./dist/workflow-designer.min.css"
});

config.devtool = '';
config.output.filename = './dist/workflow-designer.min.js';

config.module.rules[1].use = extractSass.extract({
    use: [{
        loader: "css-loader"
    }, {
        loader: "sass-loader"
    }]
});

config.plugins.push(extractSass);

module.exports = config;