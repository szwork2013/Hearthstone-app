'use strict';

var config = require('./config'),
    express = require('express'),
    morgan = require('morgan'),
    compress = require('compression'),
    bodyParser = require('body-parser');

module.exports = function(db) {
    // Create express app
    var app = express();

    // Activate logging middleware or compress
    if (process.env.NODE_ENV === 'development') {
        app.use(morgan('dev'));
    } else if (process.env.NODE_ENV === 'production') {
        app.use(compress());
    }

    // Activate body-parser
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());


    // Set 'view engine' and 'views' folder
    app.set('views', './app/views');
    app.set('view engine', 'ejs');


    // Server Routes
    require('../app/routes/index.server.routes.js')(app);
    require('../app/routes/cards.server.routes.js')(app);
    require('../app/routes/decks.server.routes.js')(app);

    // Configure static file routes. Always in the end of all routes
    app.use(express.static('./public'));

    return app;
};
