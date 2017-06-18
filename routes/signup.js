var express = require('express');
var router = express.Router();
var bodyParser = require("body-parser");
var pg = require('pg')
  , connectionString = process.env.DATABASE_URL || 'postgres://admin:secret@localhost:5432/accounts_db'
  , client
  , query;
var bcrypt = require('bcrypt-nodejs');

client = new pg.Client(connectionString);
client.connect();

/* GET signup page. */
router.get('/', function(req, res, next) {
  res.render('signup', { title: 'Sign up' });
});

router.post('/send', function(req, res, next){
    var name = req.body.name;
    var email = req.body.email;
    var FavBook = req.body.favoriteBook;
    var password = req.body.password;
	var passHash;
	bcrypt.hash(password, null, null, function(err, hash) {
    // Store hash in your password DB.
		console.log(hash);
		passHash = hash;
	});
	
  res.render('signup', { title: 'Sign up' });
    //query = client.query('INSERT INTO accounts_db (UserID, Username, Password, EmailAddress) VALUES (DEFAULT, $1, $2, $3)', [name, email, hash]);  
});

module.exports = router;