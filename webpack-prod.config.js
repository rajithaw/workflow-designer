var config = require('./webpack.config');

const ExtractTextPlugin = require("extract-text-webpack-plugin");

const extractSass = new ExtractTextPlugin({
    filename: "workflow-designer.min.css"
});

config.devtool = '';
config.output.filename = 'workflow-designer.min.js';
config.plugins[0] = extractSass;

module.exports = config;