var express = require('express');
var router = express.Router();
var async = require('async');
var Product = require('../models').Product;
var config = require('../config').config;

router.get('/', function(req, res) {
	Product.listProduct({}, function(err, doc) {
		if(err){
			console.log(err);
		} else {
			console.log(doc);
			res.render('products', { site: config,products : doc});
		}
	})
});

router.get('/:id', function(req, res) {
	var id = req.params.id;
	Product.findById(id, function(err, doc) {
		if(err) {
			console.log(err);
		} else {
			console.log(doc)
			res.render('product', {site : config, product : doc});
		}
	})
})

module.exports = router;
