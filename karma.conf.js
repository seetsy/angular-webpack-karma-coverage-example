var envMode = process.env.NODE_ENV;
var path = require('path');
var webpackConfig = require('./webpack.config');
var entry = 'test/entry.js';
var files = [
    'index.js',
    'test/entry.js'
];
var preprocessors = {
    'index.js': ['webpack'],
    'test/entry.js': ['webpack']
};

var reporters = ['spec'];
var coverageReporter = {};
var singleRun = true;
var browsers = ['Chrome'];
var plugins = [
    require('karma-webpack'),
    require('karma-chai'),
    require('karma-mocha'),
    require('karma-phantomjs-launcher'),
    require('karma-chrome-launcher'),
    require("karma-spec-reporter")
];
// test coverage configs
if(envMode === 'testCoverage') {
    reporters.push('coverage');
    coverageReporter = {
        type: 'html',
        dir: 'test/build/coverage/'
    };
    plugins.push(require("karma-coverage"));
    plugins.push(require("istanbul-instrumenter-loader"));
}

module.exports = function(config) {
  config.set({

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha', 'chai'],

    // list of files / patterns to load in the browser
    files: files,
    webpack: webpackConfig,

    // list of files to exclude
    exclude: [
    ],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: preprocessors,
    reporters: reporters,
    coverageReporter: coverageReporter,
    // enable / disable colors in the output (reporters and logs)
    colors: true,
    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,
    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,
    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: browsers,
    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: singleRun,
    plugins: plugins
  })
};
