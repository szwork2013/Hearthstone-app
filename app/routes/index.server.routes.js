'use strict';

// Define the routes module' method
module.exports = function(app) {
    app.get('/', function(req, res) {
        res.render('index.html');
    });

};