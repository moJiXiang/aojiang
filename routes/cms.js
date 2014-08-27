var express = require('express');
var router = express.Router();
var config = require('../config').config;
var async = require('async');
var Product = require('../models').Product;
var Attribute = require('../models').Attribute;

router.index = function(req, res) {
	res.render('cms', {site: config});
}
router.addAttr = function(req, res) {
	console.log('*************');
	console.log(req.body);
	console.log(req.params);
	console.log(req.query);
	var item = {
		name : req.body.name,
		value : req.body.value
	}
	// Attribute.CreateAttr()
}
module.exports = router;