var express = require('express');
var router = express.Router();
var bodyParser = require("body-parser");
var pg = require('pg')
  , connectionString = process.env.DATABASE_URL || 'postgres://postgres:password@localhost:5432/accounts'
  , client
  , query;

 var bcrypt = require('bcrypt-nodejs');

client = new pg.Client(connectionString);
client.connect();

// http://localhost:8000/signup
router.get('/', function(req, res, next) {
  res.render('signup', { title: 'Sign up' });
});

// http://localhost:8000/signup
router.post('/', function(req, res, next){
	console.log("started signup function");
    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;
    var password1 = req.body.confirmPassword;
   
	query = client.query("SELECT * FROM accounts_db where emailaddress = '"+email+"'",function(err,DB){
		console.log("accounts registered to "+email+" is: "+DB.rows.length);
		//email already registered
		if(DB.rows.length != 0){
			res.json({
				success: false,
				reason: 'invalid email'
			});
			return;
		}
		else{
			bcrypt.hash(password, null, null, function(err, hash) {
				// Store hash in your password DB.
				query = client.query('INSERT INTO accounts_db (UserID, Username, Password, EmailAddress,  AdminAccount) '+
				'VALUES (DEFAULT, $1, $2, $3, $4)', [name, hash, email,'false']);
				console.log("done adding new user with "+name+", "+email+", "+hash);
				res.render('login', { title: 'Login' });
			});//end bcrypt
		}
	});//end query
	

});






	// Error checking
	//var errors = req.validationErrors();
	//console.log(errors);

	//if(errors){
		// Respond with specific error message from messages.jade
		// http://www.telerik.com/blogs/form-validation-with-expressjs
		//res.render('signup', {title: 'Sign up', messages: errors });
	//}else{
		//res.render('signup', { title: 'Sign up' });
	//}
    //query = client.query('INSERT INTO accounts_db (UserID, Username, Password, EmailAddress) VALUES (DEFAULT, $1, $2, $3)', [name, email, password]);  

module.exports = router;