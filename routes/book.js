var pg = require('pg');
var express = require('express');
var router = express.Router();
var bodyParser = require("body-parser");

// Need to move all databasing work to another javascript file, do all the work in 1 file.
var pg = require('pg')
  , connectionString = process.env.DATABASE_URL || 'postgres://postgres:password@localhost:5432/accounts'
  , client
  , query;

client = new pg.Client(connectionString);
client.connect();

// http://localhost:8000/book/ 
router.get('/', function(req, res, next) {
  res.render('book', { title: 'Book' });
	});


	
module.exports = router;