
NWEN304 Group 15 Project - Online bookstore

How to use system:

This application does all the core requirements:

RESTFUL API:

GET  ‘/books’
GET  ‘/books/:id’
GET  ‘/users/’
GET  ‘/users/:id’
POST ‘/signup

Implement basic user registration functionality:

Click signup button enter details, user information is stored.
Passwords are hashed.
Can view newly created user with /users/

Implement basic user login / logout	functionality:

Login button correctly allows users to log into the application and have access to myaccount page.

Support easy search and browsing of shopping items (or any form of resources specific to your application):

Searching works by typing into the search bar, name of book, author or Genre
Using "SELECT * FROM books_db WHERE bookname LIKE '%"+search+"%' 
								   OR author LIKE '%"+search+"%' 
								    OR genre LIKE '%"+search+"%';"

Browsing is a little clunky, No real way to browse other than to click the browse button which will shuffle and give you a new set of 8 books to look at.

Host your server application successfully in a cloud service, i.e.  Heroku, so that your RESTful service can be easily accessed from anywhere in the Internet:

Heroku hosted at: https://blooming-bastion-13149.herokuapp.com

Correctly set up a database at the server side to achieve data persistency in your application:	
Postgresql database is setup on heroku it runs the schema.js to deploy;

- books_db
- accounts_db
- It also adds content

Use	HTTPS to achieve secure communication between web browsers and your server application.

Redirects any request to https

Info:
https://jaketrent.com/post/https-redirect-node-heroku/
https://stackoverflow.com/questions/10697660/force-ssl-with-expressjs-3

Code:
app.use(function(req, res, next){
  if (req.headers['x-forwarded-proto'] !== 'https') {
    var httpsApp = ['https://blooming-bastion-13149.herokuapp.com', req.url].join('');
    return res.redirect(httpsApp);
  }else{
    return next();
  }
});

Github https://github.com/NWENG15/NWEN304-Group-Project
Michael Vincent - PortNZ
Connor Bevan - CMBevan






