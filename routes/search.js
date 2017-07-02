var express = require('express');
var router = express.Router();
var bodyParser = require("body-parser");

var pg = require('pg')
  , connectionString = process.env.DATABASE_URL || 'postgres://postgres:password@localhost:5432/accounts'
  , client
  , query;

client = new pg.Client(connectionString);
client.connect();

// http://localhost:8000/search 
router.get('/', function(req, res, next) {
	var searchReq = req.query.s;
	query = client.query("SELECT * FROM books_db WHERE bookname LIKE '%"+searchReq+"%' OR author LIKE '%"+searchReq+"%' OR Genre LIKE '%"+searchReq+"%';");
 	var results = [];
 	 //Stream results back one row at a time
 	query.on('row', function(row) {
 	 	results.push(row);
	 });
 	 query.on('end', function() {
 	 res.render('search', { title: 'Search', results : results});
 	 });
 	});

module.exports = router;