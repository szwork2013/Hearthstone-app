'use strict';

var cards = require('../../app/controllers/cards.server.controller');

module.exports = function(app) {
    app.route('/api/cards')
        .get(cards.list);

    app.route('/api/cards/:cardId')
        .get(cards.read);

    // Set up the 'cardId' parameter middleware
    app.param('cardId', cards.cardByID);
};