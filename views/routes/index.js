/** Michael Vincent 14/6
*	Version 0.0.1
*	Group 15
*/

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	if(req.decoded == 'decoded'){
		console.log("./ is decoded");
	}
  res.render('index', { title: 'Home' });
});

module.exports = router;