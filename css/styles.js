module.exports = function() {
    /* Styles */
    //bootstrap styles
    require('bootstrap/dist/css/bootstrap.css');
    // app base scss
    require('./index.scss');
    // add other scss/less/css here - webpack will pre-process styles with the style loaders
};