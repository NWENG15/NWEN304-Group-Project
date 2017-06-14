/** Michael Vincent 14/6
*	Version 0.0.1
*	Group 15
*	Create tables for:
*	- Accounts
*	- Cart
*	- Books
*/

var pg = require('pg').native
  , connectionString = process.env.DATABASE_URL
  , client
  , query;

client = new pg.Client(connectionString);
client.connect();

query = client.query(
	'DROP TABLE IF EXISTS books_db;'+
	'DROP TABLE IF EXISTS accounts_db;'
);

// Books Database TABLE
query = client.query(
	'CREATE TABLE IF NOT EXISTS books_db (		'+
	'BookID 		SERIAL PRIMARY KEY, 		'+
	'Author 		VARCHAR(255) 	NOT NULL, 	'+
	'BookName 		VARCHAR(255) 	NOT NULL, 	'+
	'Description 	VARCHAR(255) 	NOT NULL, 	'+
	'Image 			VARCHAR(255) 	NOT NULL, 	'+
	'Price			NUMERIC			NOT NULL)	'
);

// Account Database TABLE
query = client.query(
	'CREATE TABLE IF NOT EXISTS accounts_db (	'+
	'UserID			SERIAL PRIMARY KEY,			'+
	'Username		VARCHAR(255)	NOT NULL,	'+
	'Password		VARCHAR(255)	NOT NULL, 	'+
	'EmailAddress	VARCHAR(255)	NOT NULL,	'+
	'AdminAccount	Boolean			NOT NULL)	'
);

// ADDING BOOKS
query = client.query(
	'INSERT INTO books_db (	'+
	'BookID, Author, BookName, Description, Image, Price) '+
	'VALUES (DEFAULT, $1, $2, $3, $4, $5)',
	['Margaret Atwood', 'The Handmaids Tale', 
	'Set in the near future, it describes life in what was once the United States and is now called the Republic of Gilead',
	'https://images-na.ssl-images-amazon.com/images/P/B003JFJHTS.jpg','8']
);


query.on('end', function(result) { client.end(); });
