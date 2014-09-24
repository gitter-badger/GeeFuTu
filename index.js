var express = require('express');
var passport = require('passport');

var session = require('express-session');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var multer = require('multer');
var mongoose = require('mongoose');
var cookieParser = require('cookie-parser');
var fs = require('fs');
var app = express();

//logging
app.use(morgan('dev'));
//handle cookies
app.use(cookieParser());
//session secret - CHANGE THIS TO SOMETHING ELSE!
app.use(session({
    secret: 'changemenow',
    cookie: {
        //secure: true,
        path: '/',
        httpOnly: false,
        maxAge: 24 * 60 * 60 * 1000
    }
}));
//serve up public assets
app.use(express.static(__dirname + '/public'));
//...
app.use(bodyParser.urlencoded({extended: false}));
//...
app.use(bodyParser.json());
//multi-part forms (files)
app.use(multer({dest: './uploads/'}));


app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// pass username to all responses (views)
var appendLocalsToUseInViews = function (req, res, next) {

    console.log('appendLocalsToUseInViews');
    console.log(req.session);
    res.locals.request = req;
    if (req.session != null && req.session.userName != null) {

        res.locals.userName = req.session.userName;
    }
    next(null, req, res);
};
app.use(appendLocalsToUseInViews);

app.get('/', function (req, res) {
    res.render('index');
});

// dynamically include routes (Controller)
fs.readdirSync('./controllers').forEach(function (file) {
    if (file.substr(-3) == '.js') {
        route = require('./controllers/' + file);
        route.controller(app);
    }
});


mongoose.connect('mongodb://localhost/geefutu');
app.listen(8080);
console.log('8080');

