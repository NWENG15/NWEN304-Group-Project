var pg = require('pg');
var express = require('express');
var router = express.Router();

//const pool = require('/database/database');
console.log('test');
var connectionString = "postgres://postgres:password@localhost:5432/auth;";

/* GET browse page. */
router.get('/', function(req, res, next) {
	var client = new pg.Client(connectionString);
	
	client.connect();
	 // SQL Query > Select Data
 	var query = client.query("SELECT * FROM books_db");
 	var results = []
 	// Stream results back one row at a time
 	query.on('row', function(row) {
 	results.push(row);
	 });
 	// After all data is returned, close connection and return results
 	query.on('end', function() {
 	client.end();
	
	res.render('browse', { title: 'Browse', results: results });
	});
});

module.exports = router;
