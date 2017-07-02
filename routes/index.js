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

// GET http://localhost:8000/
	router.get('/', function(req, res, next) {
		client = new pg.Client(connectionString);
		client.connect();
  		query = client.query("SELECT * FROM books_db;");
 		var results = []
 		query.on('row', function(row) {
 	 	results.push(row);
	 });
 	 	query.on('end', function() {
 	 	res.render('index', { title: 'Home', results: results });
 	});
});

// GET http://localhost:8000/books
	router.get('/books/', function(req, res, next) {
		query = client.query("SELECT * FROM books_db;");	
		var results = []
 		query.on('row', function(row) {
 	 	results.push(row);
	 });
 	 	query.on('end', function() {
 	 	res.status(200).json({success: true, data: results});
 		});
 	});

/* GET http://localhost:8000/books/:id */
	router.get('/books/:id', function(req, res, next) {
		var id = req.params.id;
		if(typeof id == 'undefined'){
			return res.status(500).json({success: false, data: 'invalid book id'});
		}else{ 
			next();
		}
	}, function(req, res, next){
  			query = client.query("SELECT * FROM books_db WHERE bookid="+req.params.id+";");
 			var book = [];
 				query.on('row', function(row) {
 	 				book.push(row);
	 			});
 	 			query.on('end', function() {
 	 				//res.render('book', { title: 'Browse All Products', book : book });	// Can render a book object
 	 				res.status(200).json({success: true, data: book});
 				});
});

/* GET http://localhost:8000/search/:id */
	router.get('/search/:id', function(req, res, next){
	var searchReq = req.params.id;
		if(typeof id == 'undefined' || typeof searchReq == ''){
			return res.status(500).json({success: false, data: 'invalid book id'});
		}else{ 
			next();
		}
	}, function(req, res, next){		
	query = client.query("SELECT * FROM books_db WHERE bookname LIKE '%"+searchReq+"%' OR author LIKE '%"+searchReq+"%' OR Genre LIKE '%"+searchReq+"%';");
 	var book = [];
 	query.on('row', function(row) {
 	 	book.push(row);
	 });
 	 query.on('end', function() {
 	 //res.render('book', { title: 'Search', book: book });		// Can render a book object
 	 res.status(200).json({success: true, data: book});	// Proper api return
 	 });
});

	// GET http://localhost:8000/users
	router.get('/users/', function(req, res, next) {
		query = client.query("SELECT * FROM accounts_db;");	
		var results = []
 		query.on('row', function(row) {
 	 	results.push(row);
	 });
 	 	query.on('end', function() {
 	 	res.status(200).json({success: true, data: results});
 		});
 	});

 		// GET http://localhost:8000/users/:id
	router.get('/users/:id', function(req, res, next) {
		var searchReq = req.params.id;
		query = client.query("SELECT * FROM accounts_db WHERE userid="+req.params.id+";");	
		var results = []
 		query.on('row', function(row) {
 	 	results.push(row);
	 });
 	 	query.on('end', function() {
 	 	res.status(200).json({success: true, data: results});
 		});
 	});






module.exports = router;
