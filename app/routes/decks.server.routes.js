'use strict';

var decks = require('../../app/controllers/decks.server.controller');

module.exports = function(app) {
    app.route('/api/decks')
        .get(decks.list)
        .post(decks.create);

    app.route('/api/decks/:deckId')
        .get(decks.read);

    // Set up the 'deckId' parameter middleware
    app.param('deckId', decks.deckByID);
};