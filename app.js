var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');
var app = express();
var port = process.env.PORT || 3000;
var pg = require('pg');

// PASSPORT Imports
var passport = require('passport');
var flash = require('connect-flash');
var session = require('express-session');

// Engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade'); //html engine

// POSTGRES
var connectionString = "postgres://postgres:password@localhost:5432/auth;";
var client = new pg.Client(connectionString);

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// ROUTING USE
app.use('/', require('./routes/index'));
app.use('/about', require('./routes/about'));
app.use('/contact', require('./routes/contact'));
console.log('test');
app.use('/browse', require('./routes/browse'));
//app.use('/login', require('./routes/login'));
//app.use('/signup', require('./routes/signup'));

// PASSPORT USE
//require('./config/passport')(passport)
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  
  // error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
