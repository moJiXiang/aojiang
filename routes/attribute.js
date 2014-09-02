var express = require('express');
var router = express.Router();
var async = require('async');
var Attribute = require('../models').Attribute;

router.post('/add', function(req, res) {
	var attri = req.body;
	Attribute.createAttr(attri, function (result) {
		res.send({status : 200, result : result})
	});
})

router.get('/:id/del', function(req, res) {
	var id = req.params.id;
	Attribute.findByIdAndRemove(id, function(err) {
		if(err) {
			console.log(err);
		}else{
			res.send({status : 200});
		}
	});
})

module.exports = router;