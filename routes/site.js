var express = require('express');
var router = express.Router();
var config = require('../config').config;
var async = require('async');
var Product = require('../models').Product;
var Attribute = require('../models').Attribute;
var Message = require('../models').Message;

/* GET home page. */
router.get('/', function(req, res) {
	async.auto({
		mainproducts: function(cb) {
			Product.listProduct({
				main: true,
				limit: 3
			}, cb);
		},
		products: function(cb) {
			Product.listProduct({
				main: false,
				limit: 4
			}, cb);
		},
		messages: function(cb) {
			Message.listMsg({
				isindustry: false,
				limit: 2
			}, function(err, messages) {
				messages.forEach(function(m) {
					var date = m.createat.getFullYear() + '-' + (m.createat.getMonth() + 1) + '-' + m.createat.getDate();
					m.date = date;
				})
				cb(null, messages);
			})
		},
		industries: function(cb) {
			Message.listMsg({
				isindustry: true,
				limit: 5
			}, cb)
		}

	}, function(err, result) {
		res.render('main', {
			site: config,
			mainproducts: result.mainproducts,
			products: result.products,
			messages: result.messages,
			industries: result.industries
		})
	})
});

router.get('/about', function(req, res) {
	Product.listProduct({
		main: true
	}, function(err, doc) {
		if (err) {
			console.log(err);
		} else {
			res.render('about', {
				site: config,
				products: doc
			});
		}
	})
});

router.get('/products', function(req, res) {
	async.auto({
		mainproducts: function(cb) {
			Product.listProduct({
				main: true
			}, cb)
		},
		otherproducts: function(cb) {
			Product.listProduct({
				main: false
			}, cb)
		}
	}, function(err, result) {
		console.log(result);
		res.render('products', {
			site: config,
			mainproducts: result.mainproducts,
			otherproducts: result.otherproducts
		});
	})
});
// router.get('/product/:id', function(req, res) {

// 			res.render('product', { site: config});
// });
router.get('/messages', function(req, res) {
	async.auto({
		messages: function(cb) {
			Message.listMsg({
				isindustry: false,
				limit: 2
			}, function(err, messages) {
				messages.forEach(function(m) {
					var date = m.createat.getFullYear() + '-' + (m.createat.getMonth() + 1) + '-' + m.createat.getDate();
					m.date = date;
				})
				cb(null, messages);
			})
		},
		products: function(cb) {
			Product.listProduct({
				main: true,
				limit: 5
			}, cb)
		}
	}, function(err, result) {
		res.render('messages', {
			site: config,
			messages: result.messages,
			products: result.products
		})
	})
});

router.get('/cms', function(req, res) {
	async.auto({
		products: function(cb) {
			Product.listProduct({}, cb);
		},
		messages: function(cb) {
			Message.listMsg({
				isindustry: false
			}, cb);
		},
		industries: function(cb) {
			Message.listMsg({
				isindustry: true
			}, cb);
		},
		attributes: function(cb) {
			Attribute.listAttr({}, cb);
		},
		classes: function(cb) {
			Attribute.listAttr({
				name: "classes"
			}, cb);
		},
		applyrange: function(cb) {
			Attribute.listAttr({
				name: "applyrange"
			}, cb);
		},
		headform: function(cb) {
			Attribute.listAttr({
				name: "headform"
			}, cb);
		},
		standardtype: function(cb) {
			Attribute.listAttr({
				name: "standardtype"
			}, cb);
		},
		standardnum: function(cb) {
			Attribute.listAttr({
				name: "standardnum"
			}, cb);
		},
		type: function(cb) {
			Attribute.listAttr({
				name: "type"
			}, cb);
		},
		groove: function(cb) {
			Attribute.listAttr({
				name: "groove"
			}, cb);
		},
		action: function(cb) {
			Attribute.listAttr({
				name: "action"
			}, cb);
		},
		material: function(cb) {
			Attribute.listAttr({
				name: "material"
			}, cb);
		},
		surfacetreatment: function(cb) {
			Attribute.listAttr({
				name: "surfacetreatment"
			}, cb);
		},
	}, function(err, result) {
		res.render('cms', {
			site: config,
			products: result.products,
			messages: result.messages,
			industries: result.industries,
			attributes: result.attributes,
			classes: result.classes,
			applyrange: result.applyrange,
			headform: result.headform,
			standardtype: result.standardtype,
			standardnum: result.standardnum,
			type: result.type,
			groove: result.groove,
			action: result.action,
			material: result.material,
			surfacetreatment: result.surfacetreatment,
		});
	})
});

module.exports = router;