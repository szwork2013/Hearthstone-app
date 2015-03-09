'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CardSchema = new Schema({
    id          : String,

    name        : String,
    text        : String,

    playerClass : String,

    type        : String,
    rarity      : String,

    faction     : String,
    flavor      : String,
    artist      : String,

    cost        : Number,
    attack      : Number,
    health      : Number,

    collectible : Boolean,
    elite       : Boolean,

    cardimage   : String,

    howToGet    : String,
    howToGetGold: String,

    mechanics   : [String]
});

mongoose.model('Card', CardSchema);