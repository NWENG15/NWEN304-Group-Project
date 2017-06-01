var express = require('express');
var router = express.Router();
module.exports = function(app, passport){


/* GET login page. */
router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Login' });
});

router.post('/login',
	passport.authenticate('local',{ 
	successRedirect: '/',
	failureRedirect: '/login' }));
}
	
module.exports = router;