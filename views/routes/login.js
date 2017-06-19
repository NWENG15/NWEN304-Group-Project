var express = require('express');
var router = express.Router();
var app = express();
var bodyParser = require("body-parser");
var pg = require('pg')
  , connectionString = process.env.DATABASE_URL || 'postgres://admin:secret@localhost:5432/accounts_db'
  , client
  , query;
 var bcrypt = require('bcrypt-nodejs');

  
var jwt = require('jsonwebtoken');

// GET login page. 
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Login' });
});


router.post('/send',function(req,res,next){
	console.log("post login");
	var email = req.body.email;
	var password = req.body.password;
	
	var userName;
	
	// if (!user) {
    //  res.json({ success: false, message: 'Authentication failed. User not found.' });
	//get hash from db
	var hash = '$2a$10$Smw6nM1Ztu72tMaeiw.TI.Yt1o2kTilsbJy5QkYfDX7S/KJBqbqEq'; //for password = gg, replace with hash from DB
	
	
	//check validity of password given
	bcrypt.compare(password, hash, function(err, hashbool) {
		console.log("err: "+err+" hashbool: "+hashbool);
		//password and hash match
		if(hashbool){		
			// if user is found and password is right
			var token = jwt.sign({email: email,expiresIn: '1h'}, String(app.get('passCode')));	// create a token
			res.json({ 		// return the information including token as JSON
				success: true,
				message: 'Enjoy your token!',
				token: token
			}); 
		}
		//do not match
		else{
			console.log("hash and password do not match");
			res.json({ success: false, message: 'Authentication failed. Wrong password.' });
			//res.redirect('/signin');
		}
	});

  });

  
  

  
  
  
  
  
  
  
/*
module.exports = function(app, passport){


// GET login page. 
router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Login' });
});




router.post('/auth',function(req,res,next){
	var email = req.body.email;
	var password = req.body.password;
	
	var userName;
	
	// if (!user) {
    //  res.json({ success: false, message: 'Authentication failed. User not found.' });
	//get hash from db
	var hash = '$2a$10$Smw6nM1Ztu72tMaeiw.TI.Yt1o2kTilsbJy5QkYfDX7S/KJBqbqEq'; //for password = gg, replace with hash from DB
	
	
	//check validity of password given
	bcrypt.compare(password, hash, function(err, hashbool) {
		//password and hash match,
		if(hashbool != true){
			res.json({ success: false, message: 'Authentication failed. Wrong password.' });
			console.log("hash and password do not match");
			}
		});

	// if user is found and password is right
	// create a token
	var token = jwt.sign(user, app.get('passCode'), {
	  expiresInMinutes: 1440 // expires in 24 hours
	});

	// return the information including token as JSON
	res.json({
	  success: true,
	  message: 'Enjoy your token!',
	  token: token
	}); 
    

  });

router.post('/login',
	passport.authenticate('local',{ 
	successRedirect: '/',
	failureRedirect: '/login' }));
}

*/

	
module.exports = router;