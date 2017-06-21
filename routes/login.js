var express = require('express');
var router = express.Router();
var app = express();
var bodyParser = require("body-parser");
var pg = require('pg')
  , connectionString = process.env.DATABASE_URL || 'postgres://admin:secret@localhost:5432/accounts_db'
  , client
  , query;
 var bcrypt = require('bcrypt-nodejs');
app.set('passCode', 'Fpuqxcp9RoGDqEVF'); // for jwt 

  
var jwt = require('jsonwebtoken');

// GET login page. 
router.get('/', function(req, res, next) {
	
	/*if we are already logged in and authenticated redirect
	* to the logout page
	*/
	if(req.decoded != undefined){
		res.render('logout', {title: 'Logout'});
	}
  res.render('login', { title: 'Login' });
});


router.post('/send',function(req,res,next){
	var email = req.body.email;
	var password = req.body.password;

	//TODO: actually connect to DB 
	
	var userName = 'Connor'; //get from DB
	
	//need to check DB for the email
	// if (!email) {
    //  res.json({ success: false, message: 'Authentication failed. User not found.' }); //reply to invalid username
	
	//get hash from db
	var hash = '$2a$10$Smw6nM1Ztu72tMaeiw.TI.Yt1o2kTilsbJy5QkYfDX7S/KJBqbqEq'; //for password = gg, replace with hash from DB
	
	
	
	//check validity of password given
	bcrypt.compare(password, hash, function(err, match) {
		//password and hash match
		if(match){	
			// if user is found and password is right
			var token = jwt.sign({email: email, userName : userName}, String(app.get('passCode')),{expiresIn: '1hr'});	// create a token
			res.json({//reply to user 
				success: true,
				email: email,
				userName: userName, //replace with user name from DB
				token: token
			}); 
		}
		//password given and hash stored in DB do not match
		else{
			res.json({ success: false, message: 'Wrong password given.' });
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