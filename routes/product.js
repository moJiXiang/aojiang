var express = require('express');
var router = express.Router();
var async = require('async');
var Product = require('../models').Product;
/** this npm package modify req.files**/
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
var config = require(../config).config;
var gm = require('gm')
,	fs = require('fs')
,	imageMagick = gm.subClass({ imageMagick : true });

router.post('/add', function(req, res) {
	var product = req.body;
	Product.createPro(product, function (result) {
		res.send({status : 200, result: result});
	})
})

router.post('/upload/:id', multipartMiddleware,  function(req, res) {
	console.log('*************');
	console.log(req.files)
	
	var path = req.files.img.path;	//获取用户上传过来的文件的当前路径
	
	imageMagick(path)
	.resize(config.imgSizeBig.width, config.imgSizeBig.height, '!') //加('!')强行把图片缩放成对应尺寸150*150！
	.autoOrient()
	.write('public/images/products/bgsize/'+req.files.img.name, function(err){
		if (err) {
			console.log(err);
			res.end();
		} else {
			imageMagick(path)
				.resize(config.imgSizeSm.width, config.imgSizeSm.height, '!') //加('!')强行把图片缩放成对应尺寸150*150！
				.autoOrient()
				.write('public/images/products/smsize/'+req.files.img.name, function(err){
					if(err) {
						console.log(err);
						res.end();
					}
				}
		}
		// fs.unlink(path, function() {
		// 	return res.end('3');
		// });
	});
})

router.get('/:id/del', function(req, res) {
	var id = req.params.id;
	Product.findByIdAndRemove(id, function(err) {
		if(err) {
			console.log(err);
		}else{
			res.send({status : 200});
		}
	});
})

module.exports = router;
