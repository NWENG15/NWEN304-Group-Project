var express = require('express');
var router = express.Router();

module.exports = function(app, passport){

/* GET signup page. */
router.get('/signup', function(req, res, next) {
  res.render('signup', { title: 'Sign up' });
});

router.post('/signup',
	passport.authenticate('signup',{ 
	successRedirect: '/',
	failureRedirect: '/signup' 
	}));
}
module.exports = router;