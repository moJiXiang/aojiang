var express = require('express');
var router = express.Router();
var async = require('async');
var Message = require('../models').Message;

router.post('/add', function(req, res) {
	var message = req.body;
	console.log(message);
	Message.createMsg(message, function (result) {
		res.send({status : 200, result : result})
	});
})

module.exports = router;
