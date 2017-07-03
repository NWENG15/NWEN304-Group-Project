var express = require('express');
var router = express.Router();
var app = express();
var bodyParser = require("body-parser");
var pg = require('pg')
  , connectionString = process.env.DATABASE_URL || 'postgres://postgres:password@localhost:5432/accounts'
  , client
  , query;
  
  
  // GET login page. 
router.get('/', function(req, res, next) {
	
	/*if we are already logged in and authenticated redirect
	* to the my account page otherwise the login page
	*/
	if(req.decoded != undefined){
		res.render('myAccount', {title: 'myAccount'});
	}
  res.render('login', { title: 'Login' });
});

router.post('/email',function(req, res, next){
	console(req.decoded.email);
});

router.post('/name',function(req, res, next){
	
});

router.post('/password',function(req, res, next){
	
});

module.exports = router;