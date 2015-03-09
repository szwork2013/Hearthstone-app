'use strict';

var config = require('./config'),
    mongoose = require('mongoose');

module.exports = function() {
    var db = mongoose.connect(config.db);
    require('../app/models/card.server.model');
    require('../app/models/deck.server.model');

    return db;
};