var express = require('express');
var router = express.Router();
var config = require('../config').config;

/* GET home page. */
router.get('/', function(req, res) {
  res.render('main', { site: config });
});

router.get('/about', function(req, res) {
  res.render('about', { site: config });
});

router.get('/products', function(req, res) {
  res.render('products', { site: config });
});

router.get('/messages', function(req, res) {
  res.render('messages', { site: config });
});
module.exports = router;
