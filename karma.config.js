var webpackConfig = require('./webpack.config');

module.exports = function (config) {
    config.set({
        basePath: '',
        frameworks: ['mocha', 'chai'],
        browsers: ['ChromeHeadless'],
        files: [
            'test/**/*.ts'
        ],
        exclude: [
        ],
        preprocessors: {
            'src/ts/workflowDesigner.ts': ['webpack', 'sourcemap'],
            'test/**/*.ts': ['webpack', 'sourcemap']
        },
        webpack: {
            module: webpackConfig.module,
            resolve: webpackConfig.resolve
        },
        mime: {
            'text/x-typescript': ['ts','tsx']
        },        
        reporters: ['progress'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        singleRun: true,
        concurrency: Infinity
    })
}