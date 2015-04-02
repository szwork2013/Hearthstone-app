'use strict';

var users = require('../../app/controllers/users.server.controller');

module.exports = function(app) {
    app.route('/signin')
        .post(users.signin);

    app.post('/signup', users.signup);

    //app.post('/me', users.me);
};
