'use strict';

// Make sure dev env is set
process.env.NODE_ENV = process.env.NODE_ENV || 'development';


var mongoose = require('./config/mongoose'),
    express = require('./config/express');



// Mongoose connection
var db = mongoose();
var app = express(db);

var port = process.env.PORT || 3111;
app.listen(port);
console.log('Server running at http://localhost:3111/');

module.exports = app;

