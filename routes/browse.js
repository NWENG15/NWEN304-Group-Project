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

// http://localhost:8000/browse 
router.get('/', function(req, res, next) {
  	query = client.query("SELECT * FROM books_db;");
 	var results = []
 	query.on('row', function(row) {
 	 	results.push(row);
	 });
 	 query.on('end', function() {
 	 res.render('browse', { title: 'Browse All Products', results: results });
 	});
});

/* GET http://localhost:8000/browse/:id */
router.get('/:id', function(req, res, next) {
	var id = req.params.id;
	// Validate id != undefined

	console.log("SELECT * FROM books_db WHERE bookid="+req.params.id+";");
  	query = client.query("SELECT * FROM books_db WHERE bookid="+req.params.id+";");
 	var book = [];
 	query.on('row', function(row) {
 	 	book.push(row);
	 });
 	 query.on('end', function() {
 	 res.render('book', { title: 'Browse All Products', book : book });
 	});
});


//var bookID = req.params.id;
//query = client.query("SELECT * FROM books_db WHERE bookid="+bookID+";");
//	var results = []
// 	// Stream results back one row at a time
// 	query.on('row', function(row) {
// 	 	results.push(row);
//	 });
// 	 query.on('end', function() {
// 	 res.render('book', { title: 'Information', results: results });
// 	});
//});

module.exports = router;
