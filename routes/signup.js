var express = require('express');
var router = express.Router();
var bodyParser = require("body-parser");
var pg = require('pg')
  , connectionString = process.env.DATABASE_URL || 'postgres://postgres:password@localhost:5432/accounts'
  , client
  , query;

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
    var password2 = req.body.confirmPassword;

    // Local Validation
	req.checkBody('name', 'Name is required').notEmpty();
	req.checkBody('password', 'Password is required').notEmpty();
	req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

	// Error checking
	var errors = req.validationErrors();

	//if(error)

    
    //query = client.query('INSERT INTO accounts_db (UserID, Username, Password, EmailAddress) VALUES (DEFAULT, $1, $2, $3)', [name, email, password]);  
});

module.exports = router;