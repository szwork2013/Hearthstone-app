'use strict';

var mongoose = require('mongoose'),
    Deck = mongoose.model('Deck'),
    cards = require('../../app/controllers/cards.server.controller'),
    users = require('../../app/controllers/users.server.controller');

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

exports.create = function(req, res) {
    console.log(req.user);
    //if(!user.)
    //    users.fetchUserFromToken()
    // User preset check
    if(!req.user){
        return res.status(401).send({
            message: "User unauthorized"
        });
    }
    //console.log(req.body);
    if(req.body.cards.length === 0){
        return res.status(400).send({
            message: "Nothing to save"
        });
    }
    var deck = new Deck(req.body);
    // Set the deck's 'creator' prop
    deck.creator = req.user.id;

    deck.save(function(err) {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            return res.json(deck);
        }
    });
};

// Create a new controller method that retrieves a list of decks
exports.list = function(req, res) {
    // populate ~ sql joins
    Deck.find()
        .sort('-title')
        .populate('creator deckCost', 'email')
        .populate({
            path: 'cards.cardId',
            select: 'attack health cardimage cost type race name rarity'
        })
        .exec(function(err, decks) {
            if (err) {
                // If an error occurs send the error message
                return res.status(400).send({
                    message: getErrorMessage(err)
                });
            } else {
                res.json(decks);
            }
    });
};

// Create a new controller method that returns an existing deck
exports.read = function(req, res) {
    return res.json(req.deck);
};

exports.update = function(req, res) {

    // User preset check
    if(!req.user){
        return res.status(401).send({
            message: "User unauthorized"
        });
    }
    Deck.findOne({_id: req.deck._id}, function(err, deck){
        if(err){
            // TODO
        }
        if(deck){
            if(req.user.id != deck.creator._id){
                return res.status(401).send({
                    message: "User unauthorized"
                });
            }
            else{
                var d = req.deck;
                // Update the deck fields
                d.title = req.body.title;
                //deck.content = req.body.content;

                // Try saving the updated deck
                d.save(function(err) {
                    if (err) {
                        // If an error occurs send the error message
                        return res.status(400).send({
                            message: getErrorMessage(err)
                        });
                    } else {
                        // Send a JSON representation of the deck
                        return res.json(d);
                    }
                });
            }
        }
    });
};


exports.delete = function(req, res) {
    // Get the deck from the 'request' object
    var deck = req.deck;
    // Use the model 'remove' method to delete the deck
    deck.remove(function(err) {
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

// Middleware that retrieves a single existing deck
exports.deckByID = function(req, res, next, id) {
    Deck.findById(id)
        .populate('creator', 'email')
        .populate({
            path: 'cards.cardId',
            select: 'attack health cardimage cost type race name rarity'
        })
        .exec(function(err, deck) {
            if (err) return next(err);
            if (!deck) return next(new Error('Failed to load deck ' + id));
            // If deck is found use the 'request' object to pass it to the next middleware
            req.deck = deck;
            // Call the next middleware
            next();
        });
};

// Create a new controller middleware that is used to authorize an deck operation
exports.hasAuthorization = function(req, res, next) {
    // If the current user is not the creator of the deck send the appropriate error message
    if (req.deck.creator.id !== req.user.id) {
        return res.status(403).send({
            message: 'User is not authorized'
        });
    }
    // Call the next middleware
    next();
};

//function ensureAuthorized(req, res, next) {
//    var bearerToken;
//    var bearerHeader = req.headers["authorization"];
//    if (typeof bearerHeader !== 'undefined') {
//        var bearer = bearerHeader.split(" ");
//        bearerToken = bearer[1];
//        req.token = bearerToken;
//        next();
//    } else {
//        res.send(403);
//    }
//}