'use strict';

exports.render = function(req, res) {
    res.render('index', {
        title: 'Hearthstone Viewer'
    })
};