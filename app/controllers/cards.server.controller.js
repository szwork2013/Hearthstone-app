'use strict';

var mongoose = require('mongoose'),
    Card = mongoose.model('Card');

var getErrorMessage = function(err) {
    if (err.errors) {
        for (var errName in err.errors) {
            if (err.errors[errName].message) return err.errors[errName].message;
        }
    } else {
        return 'Unknown server error';
    }
};

exports.list = function(req, res) {
    // TODO possible injection ?? //req.query
    Card.find(req.query)
        .sort('cost')
        .exec(function(err, cards) {
            if (err) {
                // If an error occurs send the error message
                return res.status(400).send({
                    message: getErrorMessage(err)
                });
            } else {
                // Send a JSON representation of the card
                res.json(cards);
            }
        });
};

exports.neutralCardsList = function(req, res) {
    // TODO possible injection ?? //req.query
    Card.find(req.query)
        .exists('playerClass', false)
        .sort('cost')
        .exec(function(err, cards) {
            if (err) {
                // If an error occurs send the error message
                return res.status(400).send({
                    message: getErrorMessage(err)
                });
            } else {
                // Send a JSON representation of the card
                return res.json(cards);
            }
        });
};

// Create a new controller method that returns an existing card
exports.read = function(req, res) {
    res.json(req.card);
};

// Create a new controller middleware that retrieves a single existing card
exports.cardByID = function(req, res, next, id) {
    // Use the model 'findById' method to find a single card
    Card.findById(id).exec(function(err, card) { //.populate('creator', 'firstName lastName fullName')
        if (err) return next(err);
        if (!card) return next(new Error('Failed to load Card ' + id));
        // If a card is found use the 'request' object to pass it to the next middleware
        req.card = card;
        // Call the next middleware
        next();
    });
};