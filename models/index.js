var mongoose = require('mongoose')
, 	config = require('../config').config;

mongoose.connect(config.db, function(err) {
	if(err) {
		console.error('connect to %s error', config.db, err.message);
		process.exit(1);
	}
})

// models
require('./product');
require('./attribute');

exports.Product = mongoose.model('Product');
exports.Attribute = mongoose.model('Attribute');

