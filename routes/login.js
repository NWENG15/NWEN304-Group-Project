var express = require('express');
var router = express.Router();
var app = express();
var bodyParser = require("body-parser");
var pg = require('pg')
  , connectionString = process.env.DATABASE_URL || 'postgres://postgres:password@localhost:5432/accounts'
  , client
  , query;
 var bcrypt = require('bcrypt-nodejs');
app.set('passCode', 'Fpuqxcp9RoGDqEVF'); // for jwt 

var jwt = require('jsonwebtoken');

client = new pg.Client(connectionString);
client.connect();

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
	
	//search DB for password of given email
	query = client.query("SELECT * FROM accounts_db where emailaddress = '"+email+"'",function(err,DB){
		if(err)
			return console.error('error running query', err);
		if(DB.rows.length == 0)
			return console.log("account not found");
		
		var hash = DB.rows[0].password; //get hash of password from DB
		var userName = DB.rows[0].username; //get from DB
		
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
		});//end bcrpyt		
	});//end query
  });

	
module.exports = router;