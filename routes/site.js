var express = require('express');
var router = express.Router();
var config = require('../config').config;
var async = require('async');
var Product = require('../models').Product;

// router.get('/', function(req, res) {
//   res.render('main', { site: config });
// });

router.get('/about', function(req, res) {
  res.render('about', { site: config });
});

router.get('/products', function(req, res) {
  res.render('products', { site: config });
});

router.get('/messages', function(req, res) {
  res.render('messages', { site: config });
});

/* GET home page. */
router.initIndex = function(req, res) {
	async.auto({
		mainproducts : function (cb) {
			Product.listProduct({main: true, limit: 3}, cb);
		},
		products : function(cb) {
			Product.listProduct({main: false, limit: 4}, cb);
		}
	}, function(err, result) {
		res.render('main', {
			site: config,
			mainproducts: result.mainproducts,
			products: result.products
		})
	})
}
module.exports = router;
