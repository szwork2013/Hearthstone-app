'use strict';

var mongoose = require('mongoose'),
    config = require('../../config/config'),
    User = mongoose.model('User'),
    jwt = require('jsonwebtoken');

var jwtTokenExpireInMinutes = 1440*2;

///**
// * Show profile
// * returns {username, profile}
// */
//exports.show = function (req, res, next) {
//    var userId = req.params.userId;
//    User.findById(ObjectId(userId), function (err, user) {
//        if (err) {
//            return next(new Error('Failed to load User'));
//        }
//        if (user) {
//            res.send({username: user.username, profile: user.profile });
//        } else {
//            res.send(404, 'USER_NOT_FOUND')
//        }
//    });
//};

exports.exists = function (req, res, next) {
    var username = req.params.username;
    User.findOne({ username : username }, function (err, user) {
        if (err) {
            return next(new Error('Failed to load User ' + username));
        }
        if(user) {
            res.json({exists: true});
        } else {
            res.json({exists: false});
        }
    });
};



exports.signin = function (req, res) {
    User.findOne({email: req.body.email}, function(err, user) {
        // Error
        if (err) {
            // return Bad Request
            return res.status(400).send({
                message: "Error occurred: " + err
            });
        } else {
            // User not found
            if(!user){
                return res.json({
                    type: false,
                    message: "Incorrect email/password"
                });
            } else{// User found
                // Check for password
                if (user.authenticate(req.body.password)) {// matched
                    // Check token
                    jwt.verify(user.token, process.env.JWT_SECRET, function(err, decoded) {
                        if (err) {
                            if(err.name === 'TokenExpiredError'){ // Token expired
                                // Make a new Token
                                user.token = jwt.sign( makeToken(user), process.env.JWT_SECRET, { expiresInMinutes: jwtTokenExpireInMinutes });
                                // Save token
                                user.save(function(err, u) {
                                    if(err){
                                        return res.json({
                                            type: false,
                                            message: 'Save error: '+err
                                        });
                                    } else{
                                        return res.json({
                                            type: true,
                                            user: {
                                                email: u.email,
                                                password: u.passwordHash
                                            },
                                            data: {
                                                token : u.token
                                            }
                                        });
                                    }
                                });
                            }
                            else{
                                return res.json({
                                    type: false,
                                    message: "Token error"
                                });
                            }
                        }
                        else{//no token err
                            // just return token
                            return res.json({
                                type: true,
                                user: {
                                    email: user.email,
                                    password: user.passwordHash
                                },
                                data: {
                                    token : user.token
                                }
                            });
                        }
                    });
                } else {// password doesn't match
                    return res.json({
                        type: false,
                        message: "Wrong password"
                    });
                }
            }
        }
    });
};

/**
 * Create new user
 * require {email, password}
 * @param req user request
 * @param res server response
 * @param next jump to next middleware
 */
exports.signup = function (req, res) {
    // Search for existing email, emails should be unique
    User.findOne({email: req.body.email}, function(err, user) {
        // Unknown error
        if (err) {
            // return Bad Request
            return res.status(400).send({
                message: "Error ocurred: " + err
            });
        } else {
            // User exists
            if (user) {
                return res.send({
                    type: false,
                    message: 'User already exists'
                });
            } else {
                // Create a new User
                var newUser = new User();
                // Set Email
                newUser.email = req.body.email;
                // Hashing password
                newUser.password = req.body.password;
                // Making JWT Token
                newUser.token = jwt.sign( makeToken(newUser), process.env.JWT_SECRET, { expiresInMinutes: jwtTokenExpireInMinutes });
                newUser.save(function(err, u) {
                    if(!err){
                        return res.json({
                            type: true,
                            user: {
                                email: u.email,
                                password: u.passwordHash
                            },
                            data: {
                                token : u.token
                            }
                        });
                    }
                    else{
                        return res.send({
                            type: false,
                            message: err.message
                        });
                    }

                })
            }
        }
    });
};

//exports.me = function (req, res) {
//    User.findOne({email: req.body.email}, function(err, user) {
//        if (err) {
//            // return Bad Request
//            return res.status(400).send({
//                message: "Error ocurred: " + err
//            });
//        } else {
//            return res.json({
//                type: true,
//                user: {
//                    _id: user._id,
//                    email: user.email,
//                    password: user.passwordHash
//                }
//            });
//        }
//    });
//};

function makeToken(user){
    return {
        id: user._id,
        email : user.email
    }
}


exports.fetchUserFromToken = function(token){
    if(token){
        return jwt.decode(token);
    }
};

//exports.isAuth = function (req, res, next) {
//
//};


