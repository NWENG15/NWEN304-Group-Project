var express = require('express')
  , pg = require('pg')
  , connectionString = process.env.DATABASE_URL
  , port = process.env.PORT
  , client;
  
var favicon = require('serve-favicon');
var logger = require('morgan');

var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var path = require('path');
var port = process.env.PORT || 8000;

var app=express();

var expressValidator = require('express-validator');
app.use(expressValidator());

// PASSPORT Imports
var passport = require('passport');
var flash = require('connect-flash');
var session = require('express-session');

// ENGINE setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade'); //html engine

// Body parsers
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());



// PATH
app.use(express.static(path.join(__dirname, 'public')));

// ROUTING USE
app.use('/', require('./routes/index'));
app.use('/browse', require('./routes/browse'));
app.use('/login', require('./routes/login'));
app.use('/signup', require('./routes/signup'));
app.use('/search', require('./routes/search'));
app.use('/book', require('./routes/book'));



// PASSPORT USE
//require('./config/passport')(passport)
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// HTTPS
//var fs = require('fs');
//var https = require('https');
//var privateKey = fs.readFileSync('https/key.pem');
//var certificate = fs.readFileSync('https/cert.pem');
//var credentials = {key: privateKey, cert: certificate};

//app.use(function)

app.listen(port, function() {
  console.log('Listening on:', port);
});

//httpServer.listen(port);
//httpsServer.listen(port);

module.exports = app;