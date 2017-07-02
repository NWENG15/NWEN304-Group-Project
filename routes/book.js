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

	/* GET http://localhost:8000/book/information */
	router.get('/information/:id', function(req, res, next) {
	var searchReq = req.params.id;
	query = client.query("SELECT * FROM books_db WHERE bookid="+req.params.id+";");
 	var results = [];
 	query.on('row', function(row) {
 	 	results.push(row);
	 });
 	 query.on('end', function() {
 	 res.render('search', { title: 'Search', results : results});
 	 });
 	});
	
module.exports = router;