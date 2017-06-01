CREATE TABLE users(
	user_id serial PRIMARY KEY,
	username VARCHAR (50) UNIQUE NOT NULL,
	created_on TIMESTAMP NOT NULL,
	last_login TIMESTAMP
);

CREATE TABLE books(
	book_id serial PRIMARY KEY,
	book_name VARCHAR(50)
)