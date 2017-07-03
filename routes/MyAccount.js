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
  
client = new pg.Client(connectionString);
client.connect();
  
  // GET login page. 
router.get('/', function(req, res, next) {
	
	/*if we are already logged in and authenticated redirect
	* to the my account page otherwise the login page
	*/
	if(req.decoded != undefined){
		res.render('myAccount', {title: 'myAccount'});
	}
	else
		res.render('login', { title: 'Login' });
});

router.post('/email',function(req, res, next){
	query = client.query("SELECT * FROM accounts_db where emailaddress = '"+req.body.newEmail+"'",function(err,DB){
		//email already registered
		if(DB.rows.length != 0){
			res.json({
				success: false,
				reason: 'invalid email'
			});
			return;
		}
		else{
			query = client.query("UPDATE accounts_db SET EmailAddress = '"+req.body.newEmail+"' WHERE EmailAddress = '"+
			req.body.oldEmail+"'");
		//	query = client.query('INSERT INTO accounts_db (UserID, Username, Password, EmailAddress,  AdminAccount) '+
		//	'VALUES (DEFAULT, $1, $2, $3, $4)', [name, hash, email,'false']);
		//	console.log("done adding new user with "+name+", "+email+", "+hash);
			res.json({
				success: true,
				reason: 'changed email'
			});
			return
		}
	});//end query
	
});

router.post('/name',function(req, res, next){
	query = client.query("UPDATE accounts_db SET UserName = '"+req.body.newName+"' WHERE EmailAddress = '"+
	req.body.Email+"'");
	res.json({
		success: true,
		reason: 'changed name'
		});
	return
});

router.post('/password',function(req, res, next){
	query = client.query("SELECT * FROM accounts_db where emailaddress = '"+req.body.Email+"'",function(err,DB){
		var oldHash = DB.rows[0].password;
		
		bcrypt.compare(req.body.oldPassword, oldHash, function(err, match) {
			//password and hash match
			if(match){
				//get hash of new password given
				bcrypt.hash(req.body.newPassword, null, null, function(err, hash) {
					// Store hash in your password DB.
					query = client.query("UPDATE accounts_db SET Password = '"+hash+"' WHERE EmailAddress = '"+
					req.body.Email+"'");
					res.json({
						success: true,
						reason: 'changed password'
					});
					return
				});//end bcrypt hash
			}
			//password given and hash stored in DB do not match
			else{
				res.json({ success: false, reason: 'invalid password' });
				return;
				}
		});//end bcrpyt compare	
	
	});//end query
});

module.exports = router;