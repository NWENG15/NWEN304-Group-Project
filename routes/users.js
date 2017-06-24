var express = require('express');
var router = express.Router();

// http://localhost:8000/users
router.get('/', function(req, res, next) {
  res.send('this is user page');
});

module.exports = router;
