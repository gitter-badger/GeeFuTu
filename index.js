var express = require('express');
var passport = require('passport');
LocalStrategy = require('passport-local').Strategy
var session = require('express-session');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var multer  = require('multer');
var methodOverride = require('method-override');
var mongoose = require('mongoose');
var fs = require('fs');
var app = express();


app.use(express.static(__dirname + '/public')); 	// set the static files location /public/img will be /img for users
app.use(morgan('short')); 					// log every request to the console
app.use(bodyParser.urlencoded({ extended: false }));
app.use(multer({ dest: './uploads/'}));


app.use(passport.initialize());
app.use(passport.session());

//app.use(methodOverride()); 					// simulate DELETE and PUT

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
console.log('8080'); 			// shoutout to the user

