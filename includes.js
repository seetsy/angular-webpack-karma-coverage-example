module.exports = function () {
    require('./css/styles')();
    var angular = require('angular');
    require("angular-ui-bootstrap");
    // enable unit testing
    if(MODE.test) {
        require('angular-mocks/angular-mocks');
    }
};