/** Michael Vincent 14/6
*	Version 0.0.1
*	Group 15
*/

// dependencies
var express = require('express')
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var path = require('path');
var port = process.env.PORT || 8000
var jwt = require('jsonwebtoken');

var client;
var app = express();
var appRouter = express.Router();

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

//jsontoken
app.set('passCode', 'SvQ^i"<Cp8 p0.Al'); // for jwt 

// PATH
app.use(express.static(path.join(__dirname, 'public')));

app.use('/login', require('./routes/login'));

//middleware
app.use(function (req,res,next){
	console.log("token check function");
//	req.decoded = 'decoded';    

//	next();

	
	var token = req.body.token || req.query.token || req.headers['x-access-token'];
	
	//if a token is given
	if(token){
		console.log("found token");
		jwt.verify(token, app.get('passCode'), function(err, decoded) {
			if (err) {
				console.log("token not authenticated");
				return res.json({ success: false, message: 'Failed to authenticate token.' });
				next();				
			}
			else{
				console.log("token authenticated");
				req.decoded = decoded;    
				next();
			}
		
		});
	}
	else{
		console.log("no token found");
		next();
		//res.redirect('/login');
		//res.render('login', { title: 'tsdsd' });

	}
	next();
	//res.redirect('/login');
	// res.render('login', { title: 'tsdsd' });*/

});
  

// ROUTING USE
app.use('/', require('./routes/index'));
app.use('/about', require('./routes/about'));
app.use('/contact', require('./routes/contact'));
app.use('/browse', require('./routes/browse'));
app.use('/signup', require('./routes/signup'));




// PASSPORT USE
//require('./config/passport')(passport)
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.listen(port, function() {
  console.log('Listening on:', port);
});

module.exports = app;