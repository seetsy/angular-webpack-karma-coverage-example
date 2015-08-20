'use strict';
var envMode = process.env.NODE_ENV;
var testMode = (envMode === 'test' || envMode==='testCoverage');
var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var appDir = path.join(__dirname, "app");
var buildDir = path.join(__dirname, "build");

var baseConfig = {
    context: __dirname,
    entry: {
        app: './index.js' // our entry point
    },
    output: {
        path: buildDir,
        filename: 'bundle.js', // our output location
        sourceMapFilename: "[file].map"
    },
    resolve: {
        root: [appDir]
    },

    recordsOutputPath: path.join(__dirname, "records.json"),// for webpack-dev-server Hot Code Replacement...
    // loaders
    module: {
        loaders: [
            {
                test: /\.scss$/,
                loader: 'style!css!sass'
            },
            {
                test: /\.css$/,
                loader: "style!css"
            },
            {
                test: /\.(png|jpg|gif)$/,
                loader: 'url-loader'
            },

            {
                test: /\.(woff|woff2|ttf|eot|svg)(\?]?.*)?$/,
                loader : 'url-loader'
            },
            {
                test: /\.js$/,
                loader: 'ng-annotate',
                exclude: /node_modules|bower_components/
            },
            {
                test: /\.html/,
                loader: 'raw'
            },
            {
                test: /\.json/,
                loader: 'json'
            }
        ]

    },
    debug: false,
    plugins: [
        new webpack.DefinePlugin({
            // Environment variables...
            MODE: {
                dev: envMode === 'dev',
                test: testMode
            }
        }),
        // uses index.html as a template for the build (outputs to /build/index.html)
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            inject: 'head' // can be head or body
        }),

        // Source Map plugin for intellij happiness
        new webpack.SourceMapDevToolPlugin(
            '[file].map', null,
            "[absolute-resource-path]", "[absolute-resource-path]")
        // Bower modules
        /*new webpack.ResolverPlugin(
            new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin("bower.json", ["main"])
        )*/
    ]
};
// Code coverage configs
if(envMode === 'testCoverage') {
    baseConfig.module.postLoaders = [{
        test: /\.js/,
        exclude: /(test|node_modules|bower_components)/,
        loader: 'istanbul-instrumenter'
    }];
    var testBuildDir = path.join(__dirname, "test/build");
    baseConfig.output.path = testBuildDir;
    //baseConfig.devtool = 'inline-source-map';
}
module.exports = baseConfig;