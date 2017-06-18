var express = require('express');
var router = express.Router();
module.exports = function(app, passport){


/* GET login page. */
router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Login' });
});


router.post('/loginpass',function(req,res,next){
	var email = req.body.email;
	var password = req.body.password;
	
	
	//get hash from db
	
	var hash;
	bcrypt.compare(password, hash, function(err, res) {
		if(res == true){
	
		}
		else{
			
		}
		});
});

router.post('/login',
	passport.authenticate('local',{ 
	successRedirect: '/',
	failureRedirect: '/login' }));
}
	
module.exports = router;