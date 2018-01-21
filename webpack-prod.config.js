var config = require('./webpack.config');

const ExtractTextPlugin = require("extract-text-webpack-plugin");

const extractSass = new ExtractTextPlugin({
    filename: "index.css"
});

config.devtool = '';
config.output.filename = 'index.js';

config.plugins[0] = extractSass;

module.exports = config;