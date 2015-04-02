'use strict';

var users = require('../../app/controllers/users.server.controller'),
    decks = require('../../app/controllers/decks.server.controller');

module.exports = function(app) {
    app.route('/api/decks')
        .get(decks.list)
        .post(decks.create);

    app.route('/api/decks/:deckId')
        .get(decks.read);
        //.put(decks.update)
        //.delete(decks.delete);

    // Set up the 'deckId' parameter middleware
    app.param('deckId', decks.deckByID);
};