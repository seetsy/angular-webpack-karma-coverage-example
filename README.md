# angular-webpack-karma-coverage-example
Angular webpack karma coverage example

This is a starting point for a project with the following setup:

* AngularJS
* Angular Bootstrap
* Webpack
* Karma with Chai/Jasmine etc.
* Code coverage with Istanbul

##Usage

*npm install*

**webpack** - does a webpack build - outputs into /build directory

**npm start** - starts the webpack-dev-server - then open http://localhost:8080/

**npm run test** - runs karma (sets environment mode to "test" so we can load additional webpack/karma configurations)

**npm run testCoverage** - runs karma (sets environment mode to "testCoverage" so we can include Istanbul for code coverage) - outputs into /test/build directory
