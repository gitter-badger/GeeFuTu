var User = require('../models/User');

module.exports.controller = function (app) {

    app.get('/signin', function (req, res) {
        return res.render('auth/signin');
    });
    app.post('/signin', function (req, res) {

        var username = req.body.username;
        var password = req.body.password;

        User.findOne({username: username}, function (err, user) {
            if (err) {
                console.log(err);
                res.send(err);
            } else {
                if (user) {
                    console.log(user);
                    user.comparePassword(password, function (err, match) {
                        if (err) {
                            console.log(err);
                            res.send(err);
                        } else {
                            if (match) {
                                req.session.userName = username;
                                res.redirect('/');
                            } else {
                                res.send('bad password');
                            }
                        }
                    });
                } else {
                    res.send('could not find user');
                }
            }
        });
    });

    app.get('/signup', function (req, res) {
        return res.render('auth/signup');
    });
    app.post('/signup', function (req, res) {

        var username = req.body.username;
        var email = req.body.email;
        var password = req.body.password;
        var confirmpassword = req.body.confirmpassword;

        //exists and eq
        if (username && email && password && confirmpassword && password === confirmpassword) {
            var user = new User({
                username: username,
                email: email,
                password: password
            });

            user.save(function (err, r) {
                if (err) {
                    console.log(err);
                    res.send(err);
                } else {
                    req.session.userName = username;
                    return res.redirect('/');
                }
            });
        } else {
            res.send('password + confirmpassword do not match');
        }
    });

    app.get('/signout', function(req, res){
        req.session.userName = null;
        res.redirect('/');
    });

};