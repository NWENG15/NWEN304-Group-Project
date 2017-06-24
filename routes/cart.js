var express = require('express');
var router = express.Router();

// http://localhost:8000/cart
router.get('/', function(req, res, next) {
  res.render('cart', { title: 'Cart' });
});

module.exports = router;