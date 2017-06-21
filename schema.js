/** Michael Vincent 14/6
*	Version 0.0.1
*	Group 15
*	Create tables for:
*	- Accounts
*	- Cart
*	- Books
*/

var pg = require('pg')
  , connectionString = process.env.DATABASE_URL || 'postgres://postgres:password@localhost:5432/accounts'
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
	'Genre			VARCHAR(255)	NOT NULL,	'+
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
	'BookID, Author, BookName, Genre,  Image, Price) '+
	'VALUES (DEFAULT, $1, $2, $3, $4, $5)',
	['Margaret Atwood', 'The Handmaids Tale', 'Drama', 
	'https://images-na.ssl-images-amazon.com/images/P/B003JFJHTS.jpg','8.00']
);
query = client.query(
	'INSERT INTO books_db (	'+
	'BookID, Author, BookName, Genre, Image, Price) '+
	'VALUES (DEFAULT, $1, $2, $3, $4, $5)',
	['Ishion Hutchinson',
	 'House of Lords: Poems', 'Poetry',
	'https://images-na.ssl-images-amazon.com/images/I/51srsw6X7SL._AC_SR201,266_.jpg',
	'12.75']
);

query = client.query(
	'INSERT INTO books_db (	'+
	'BookID, Author, BookName, Genre, Image, Price) '+
	'VALUES (DEFAULT, $1, $2, $3, $4, $5)',
	['Carol Anderson',
	 'Truth of Our Racial Divide', 'Drama',
	'https://images-na.ssl-images-amazon.com/images/I/41lfBbuM%2BGL._AC_SR201,266_.jpg',
	'6.30']
);

query = client.query(
	'INSERT INTO books_db (	'+
	'BookID, Author, BookName, Genre, Image, Price) '+
	'VALUES (DEFAULT, $1, $2, $3, $4, $5)',
	['J.K. Rowling',
	 'Harry Potter: The Sorcerer'+'s Stone', 'Action',
	'https://images-na.ssl-images-amazon.com/images/I/51PxQCRCx0L._SX412_BO1,204,203,200_.jpg',
	'13.25']
);

query = client.query(
	'INSERT INTO books_db (	'+
	'BookID, Author, BookName, Genre, Image, Price) '+
	'VALUES (DEFAULT, $1, $2, $3, $4, $5)',
	['J.K. Rowling', 
	'Harry Potter Order of the Phoenix', 'Action',
	'https://images-na.ssl-images-amazon.com/images/I/51Nex9f38rL._SX322_BO1,204,203,200_.jpg',
	'12.50']
);

query = client.query(
	'INSERT INTO books_db (	'+
	'BookID, Author, BookName,  Genre,Image, Price) '+
	'VALUES (DEFAULT, $1, $2, $3, $4, $5)',
	['J.K. Rowling', 
	'Harry Potter The Half-Blood Prince', 'Action',
	'https://images-na.ssl-images-amazon.com/images/I/51uO1pQc5oL._SX329_BO1,204,203,200_.jpg',
	'15.00']
);

query = client.query(
	'INSERT INTO books_db (	'+
	'BookID, Author, BookName,  Genre,Image, Price) '+
	'VALUES (DEFAULT, $1, $2, $3, $4, $5)',
	['J.K. Rowling', 
	'Harry Potter and the Cursed Child', 'Action',
	'https://images-na.ssl-images-amazon.com/images/I/518VhA3dH9L._SX329_BO1,204,203,200_.jpg',
	'9.30']
);

query = client.query(
	'INSERT INTO books_db (	'+
	'BookID, Author, BookName, Genre,Image, Price) '+
	'VALUES (DEFAULT, $1, $2, $3, $4, $5)',
	['John Grisham', 
	'Camino Island', 'Drama',
	'https://images-na.ssl-images-amazon.com/images/I/512RnM56g6L.jpg',
	'19.30']
);


query.on('end', function(result) { client.end(); });
