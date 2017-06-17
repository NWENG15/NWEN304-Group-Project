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



/* GET search page. */
router.get('/', function(req, res, next) {
	//console.log(req.query.s); 	// req.query.s retrieves name of search


	query = client.query("SELECT * FROM books_db WHERE bookname LIKE '%"+req.query.s+"%';");
 	var results = []
 	// Stream results back one row at a time
 	query.on('row', function(row) {
 	 	results.push(row);
	 });
 	 query.on('end', function() {
 	 res.render('search', { title: 'Search', results: results });
 	 });
 	});
 		
// Iterate over database table 
// pull out each name of every book
// if name contains the substring
// get the whole book object
// add to array
// send to search page ready for each book to be displayed




module.exports = router;