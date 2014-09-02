var express = require('express');
var router = express.Router();
var async = require('async');
var Product = require('../models').Product;
/** this npm package modify req.files**/
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
var config = require('../config').config;
var gm = require('gm')
,	fs = require('fs')
,	imageMagick = gm.subClass({ imageMagick : true });

router.post('/add', function(req, res) {
	var product = req.body;
	Product.createPro(product, function (result) {
		res.send({status : 200, result: result});
	})
})

router.post('/upload/:size/:id', multipartMiddleware,  function(req, res) {
	
	var path = req.files.img.path;	//获取用户上传过来的文件的当前路径
	var size = req.params.size;
	var id = req.params.id;
	var imgname = req.files.img.name;
	var width = size == "big" ? config.imgSizeBig.width : config.imgSizeSm.width;
	var height = size == "big" ? config.imgSizeBig.height : config.imgSizeSm.height;
	var writepath = size == "big" ? "public/images/products/bgsize/" ? "public/images/products/smsize/"

	imageMagick(path)
	.resize(width, height, '!') //加('!')强行把图片缩放成对应尺寸150*150！
	.autoOrient()
	.write(writepath + imgname, function(err){
		if (err) {
			console.log(err);
			res.end();
		} 
		if(size == "big"){
			Product.findByIdAndUpdate(id, { coverimage : imgname });
		} else {
			Product.findByIdAndUpdate(id, {$push:{image : imgname}});
		}
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
