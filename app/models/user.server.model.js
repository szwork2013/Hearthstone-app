'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    crypto = require('crypto');

var UserSchema = new Schema({
    email: String,
    passwordHash: String,
    token: String,
    salt: String,
    created: {
        type: Date,
        default: Date.now
    }
});


//var UserSchema = new Schema({
//    email: {
//        type: String,
//        unique: true,
//        required: true
//    },
//    password : String,
//    username: {
//        type: String,
//        unique: true
//    },
//    token: String,
//    passwordHash: String,
//    salt: String,
//    name: String,
//    created: {
//        type: Date,
//        default: Date.now
//    }
//});


// Virtual methods
UserSchema
    .virtual('password')
    .set(function(password) {
        this._password = password;
        this.salt = this.makeSalt();
        this.passwordHash = this.encryptPassword(password); // Never save plain passwords in db
    })
    .get(function() {
        return this._password;
    });

// Validation
var validateEmptyFields = function (value) {
    return value && value.length;
};

//UserSchema.path('email').validate(function (email) {
//    var emailRegex = /.+\@.+\..+/;
//    return emailRegex.test(email);
//}, 'The specified email is invalid.');
//
//UserSchema.path('email').validate(function(value, respond) {
//    mongoose.models["User"].findOne({email: value}, function(err, user) {
//        if(err) throw err;
//        if(user) return respond(false);
//        respond(true);
//    });
//}, 'The specified email address is already in use.');
//
//UserSchema.path('username').validate(function(value, respond) {
//    mongoose.models["User"].findOne({username: value}, function(err, user) {
//        if(err) throw err;
//        if(user) return respond(false);
//        respond(true);
//    });
//}, 'The specified username is already in use.');
//

// Pre-save hook
UserSchema.pre('save', function(next) {
    if (!this.isNew) {// isNew is a key used by mongoose internally
        return next();
    }
    if (!validateEmptyFields(this.email && this.password)) {
        next(new Error('Empty username or password'));
    }
    else {
        next();
    }
});

// Methods
UserSchema.methods = {
    authenticate: function(plainText) {
        return this.encryptPassword(plainText) === this.passwordHash;
    },

    makeSalt: function() {
        return crypto.randomBytes(16).toString('base64');
    },

    encryptPassword: function(password) {
        // Password or salt doesn't exists
        if (!password || !this.salt)
            return '';
        var salt = new Buffer(this.salt, 'base64');
        return crypto.pbkdf2Sync(password, salt, 10000, 64).toString('base64');
    }
};

mongoose.model('User', UserSchema);