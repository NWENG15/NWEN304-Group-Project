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

//jsontoken
var jwt = require('jsonwebtoken');
app.set('passCode', 'Fpuqxcp9RoGDqEVF'); // for jwt

// PATH
app.use(express.static(path.join(__dirname, 'public')));

//TODO: put in seperate file to be more readable
//middleware
app.use(function (req,res,next){
	console.log("token check function");

	var token = req.body.token || req.query.token || req.headers['x-access-token'];
	
	//if a token is given
	if(token){
		console.log('token recieved: '+token);
		console.log('passCode: '+app.get('passCode'));

		//console.log("found token");
		jwt.verify(token, String(app.get('passCode')), function(err, decoded) {
			if (err) {
				console.log('error: '+err);
				
				//login token has expired
				if(err.message == 'jwt expired')
					res.render('forceLogout', { title: 'forceLogout' });
				next();				
			}
			else{
				console.log("token authenticated");
				console.log('decoded: '+ decoded.email);
				req.decoded = decoded;
				console.log('req.decoded: '+ req.decoded);				
				
				next();
			}
		
		});
	}
	else{
		console.log("no token found");
		next();
	}
});


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