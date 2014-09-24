var express = require('express');
var passport = require('passport');

var session = require('express-session');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var multer  = require('multer');
var mongoose = require('mongoose');
var cookieParser = require('cookie-parser');
var fs = require('fs');
var app = express();

//logging
app.use(morgan('dev'));
//session secret - CHANGE THIS TO SOMETHING ELSE!
app.use(session({ secret: 'changemenow' }));
//serve up public assets
app.use(express.static(__dirname + '/public'));
//...
app.use(bodyParser.urlencoded({ extended: false }));
//...
app.use(bodyParser.json());
//multi-part forms (files)
app.use(multer({ dest: './uploads/'}));
//handle cookies
app.use(cookieParser());

//start up Password
app.use(passport.initialize());
app.use(passport.session());


app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.get('/', function (req, res) {
    res.render('index');
});

// dynamically include routes (Controller)
fs.readdirSync('./controllers').forEach(function (file) {
    if(file.substr(-3) == '.js') {
        route = require('./controllers/' + file);
        route.controller(app);
    }
});


mongoose.connect('mongodb://localhost/geefutu');
app.listen(8080);
console.log('8080');

