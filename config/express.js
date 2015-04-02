'use strict';
var config = require('./config'),
    express = require('express'),
    morgan = require('morgan'),
    compress = require('compression'),
    bodyParser = require('body-parser'),
    flash = require('connect-flash'),
    expressJwt = require('express-jwt'),
    jwt = require('jsonwebtoken'),
    cors = require('cors');

module.exports = function() {
    var app = express();

    // set JWT env var
    process.env.JWT_SECRET = config.secret;

    if (process.env.NODE_ENV === 'development') {
        app.use(morgan('dev'));
    } else if (process.env.NODE_ENV === 'production') {
        app.use(compress());
    }

    // req.body parser
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());


    app.engine('html', require('ejs').renderFile);
    app.set('view engine', 'html');

    // Cross message
    app.use(flash());

    // Allow CORS
    app.use(cors());

    // protecting '/api' routes
    app.use('/api', expressJwt({secret: process.env.JWT_SECRET})
            .unless({method: ['GET']})
    );

    //app.post('/api', expressJwt({secret: config.secret}));
    //app.put('/api', expressJwt({secret: config.secret}));
    //app.delete('/api', expressJwt({secret: config.secret}));


    // Routes
    require('../app/routes/users.server.routes.js')(app);
    require('../app/routes/decks.server.routes.js')(app);
    require('../app/routes/cards.server.routes.js')(app);

    // Always after all routes
    app.use('/', express.static('./public'));

    // Unauthorized handler
    app.use(function(err, req, res, next){
        if (err.constructor.name === 'UnauthorizedError') {
            res.status(401).send('Unauthorized');
        }
    });

    return app;
};