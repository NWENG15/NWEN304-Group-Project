/** Michael Vincent 14/6
*	Version 0.0.1
*	Group 15
*/

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {	
	if(req.decoded != undefined){//if in here, user has given a valid token
		//decode.token: the token used to authenticate
		//decode.email: users email
		//decode.userName: users user name
	}
	
  res.render('index', { title: 'Home' });
});

module.exports = router;


