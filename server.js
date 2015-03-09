'use strict';

//Make sure the right ENV var set
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var mongoose = require('./config/mongoose'),
    express = require('./config/express');

// Mongoose connection
var db = mongoose();
var app = express(db);

// Heroku dynamically assigns your app a port, i'm a moron
app.listen(process.env.PORT || 5000);

module.exports = app;


