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

// GET http://localhost:8000/browse
	router.get('/', function(req, res, next) {
		client = new pg.Client(connectionString);
		client.connect();
  		query = client.query("SELECT * FROM books_db;");
 		var results = [];
 		query.on('row', function(row) {
 	 	results.push(row);
	 });
 	 	query.on('end', function() {
 	 	//findPopular(results);	// Reorder by popularity
 	 	results = shuffleArray(results);
 	 	res.render('browse', { title: 'browse', results: results });
 	});
});

	function randomResults(results){
		for(var i = 0; i < results.length; i++){	
			//console.log(results[i].popularity);
		}
	}

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

module.exports = router;
