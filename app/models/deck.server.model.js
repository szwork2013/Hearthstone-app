'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var DeckSchema = new Schema({
    playerClass : {
        type: String,
        required: 'Deck class cannot be blank',
        enum: ['Druid', 'Hunter',
        'Mage', 'Paladin',
        'Priest', 'Rogue',
        'Shaman', 'Warlock',
        'Warrior']
    },
    type       : {
        type: String,
        default: 'Undefined',
        enum: ['Aggro', 'Combo', 'Control', 'MidRange', 'Tempo', 'Undefined']
    },
    cost        : {
        type: Number,
        default: -1
    },
    patch       : {
        type: String,
        default: 'GvG',
        enum: ['Beta', 'Release', 'Naxx', 'GvG', 'BRM']
    },
    title: {
        type: String,
        default: '',
        trim: true
    },
    creator: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    created: {
        type: Date,
        default: Date.now
    },
    cards: [
        {
            quan: Number,
            cardId: { type : Schema.ObjectId, ref: 'Card' }
        }
    ]
});

//Virtual methods
DeckSchema
    .virtual('deckCost')
    .get(function() {
        if(this.cost === -1){
            return 0;
        }
    });

function calcManaCost(elem, index, array){
    var cost = 0;
    mongoose.models["Card"].findOne({_id: elem.cardId}, function(err, card) {
        //console.log('Errror'+err);
        //console.log('cardsss'+card);
    })
}

DeckSchema.set('toJSON', {
    getters: true,
    virtuals: true
});

mongoose.model('Deck', DeckSchema);