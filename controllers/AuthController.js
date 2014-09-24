var User = require('../models/User');

module.exports.controller = function (app) {

    //redirect to correct route ('/signin')
    app.get('/login', function (req, res) {
        res.redirect('/signin');
    });

    app.get('/signin', function (req, res) {

    });

    app.get('/signup', function (req, res) {

    });

};