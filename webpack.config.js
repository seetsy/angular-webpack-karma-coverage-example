'use strict';
var envMode = process.env.NODE_ENV;
var testMode = (envMode === 'test' || envMode==='testCoverage');
var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var appDir = path.join(__dirname, "app");
var buildDir = path.join(__dirname, "build");
//var bowerDir = path.join(__dirname, "bower_components");

var baseConfig = {
    context: __dirname,
    entry: {
        app: './index.js'
    },
    output: {
        path: buildDir,
        //path: appDir,
        filename: 'bundle.js',
        //chunkFilename: '[id].bundle.js',
        sourceMapFilename: "[file].map"
    },
    resolve: {
        root: [appDir]
    },

    externals: {
        //"x2js": "X2JS"
    },
    recordsOutputPath: path.join(__dirname, "records.json"),// for webpack-dev-server Hot Code Replacement...
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
                //loader : 'file-loader?name=[name].[ext]?[hash]'
            },
            {
                test: /\.js$/,
                /*loader: 'ng-annotate!babel!jshint',*/
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
        /* code coverage
        postLoaders: [{
            test: /\.js/,
            exclude: /(test|node_modules|bower_components)/,
            loader: 'istanbul-instrumenter'
        }]*/
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
        new HtmlWebpackPlugin({  // Also generate a test.html
            filename: 'index.html',
            template: 'index.html',
            inject: 'head'
        }),

        // Source Map plugin for intellij happDiriness
        new webpack.SourceMapDevToolPlugin(
            '[file].map', null,
            "[absolute-resource-path]", "[absolute-resource-path]")
        // Bower modules
        /*new webpack.ResolverPlugin(
            new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin("bower.json", ["main"])
        )*/
    ]
};
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