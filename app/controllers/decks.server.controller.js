'use strict';

// Load the module dependencies
var mongoose = require('mongoose'),
    Deck = mongoose.model('Deck');

// Create a new error handling controller method
var getErrorMessage = function(err) {
    if (err.errors) {
        for (var errName in err.errors) {
            if (err.errors[errName].message) return err.errors[errName].message;
        }
    } else {
        return 'Unknown server error';
    }
};

// Create a new controller method that creates new decks
exports.create = function(req, res) {
    // Create a new deck object
    var deck = new Deck(req.body);
    // Try saving the deck
    deck.save(function(err) {
        if (err) {
            // If an error occurs send the error message
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            // Send a JSON representation of the deck
            res.json(deck);
        }
    });
};

// Create a new controller method that retrieves a list of decks
exports.list = function(req, res) {
    // Use the model 'find' method to get a list of decks
    Deck.find({}).sort('-title').populate('cards').exec(function(err, decks) {
        if (err) {
            // If an error occurs send the error message
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            // Send a JSON representation of the article
            res.json(decks);
        }
    });
};

// Create a new controller method that returns an existing deck
exports.read = function(req, res) {
    res.json(req.deck);
};

// Create a new controller middleware that retrieves a single existing deck
exports.deckByID = function(req, res, next, id) {
    // Use the model 'findById' method to find a single deck
    Deck.findById(id).populate('cards').exec(function(err, deck) {
        if (err) return next(err);
        if (!deck) return next(new Error('Failed to load deck ' + id));
        // If an deck is found use the 'request' object to pass it to the next middleware
        req.deck = deck;
        // Call the next middleware
        next();
    });
};
