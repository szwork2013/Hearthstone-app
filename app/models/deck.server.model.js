'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var DeckSchema = new Schema({
    playerClass : {
        type: String,
        required: 'Deck class cannot be blank'
    },
    patch       : {
        type: String,
        default: 'GvG',
        enum: ['Beta', 'Naxx', 'GvG', 'BRM']
    },
    title: {
        type: String,
        default: '',
        trim: true
    },
    cards: [{
        type : Schema.ObjectId,
        ref: 'Card'
    }]
}, { _id: false });

mongoose.model('Deck', DeckSchema);