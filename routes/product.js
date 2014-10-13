var express = require('express');
var router = express.Router();
var async = require('async');
var Product = require('../models').Product;
/** this npm package modify req.files**/
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
var UPYun = require('../upyun/upyun').UPYun;
var cloudinary = require('cloudinary');
var config = require('../config').config;

var md5 = require('md5');
var mongoose = require('mongoose');
var gm = require('gm'),
	fs = require('fs'),
	imageMagick = gm.subClass({
		imageMagick: true
	});
cloudinary.config({ 
  cloud_name: 'hmmntcglh', 
  api_key: '244273668367523', 
  api_secret: 'y9Pla4IaD0GEmnqnS9bfWOMxWEU' 
});
//初始化空间
// var upyun = new UPYun(config.bucketname, config.username, config.password);
var upyun = new UPYun("aojiang", "mojixiang", "daydayup");

function upToYun(src_path_name, target_path_name, callback) {
	var fs = require('fs');
	var fileContent = fs.readFileSync(src_path_name);
	console.log(target_path_name, fileContent)

	upyun.writeFile(target_path_name, fileContent, false, function(err, data) {
		if (err) {
			callback(err);
		} else
			callback(null, data);
	});
}

router.post('/add', function(req, res) {
	var product = req.body;
	Product.createPro(product, function(result) {
		res.send({
			status: 200,
			result: result
		});
	})
})

function validPic(type) {
	var suffix = type.split('/')[1];
	var _id = new mongoose.Types.ObjectId;
	return _id + '.' + suffix;
}

router.post('/upload/:size/:id', multipartMiddleware, function(req, res) {
	var src_path = req.files.img.path; //获取用户上传过来的文件的当前路径
	var size = req.params.size;
	var id = req.params.id;
	// var imgname = validPic(req.files.img.type);
	console.log(src_path)
	var width = size == "big" ? config.imgSizeBig.width : config.imgSizeSm.width;
	var height = size == "big" ? config.imgSizeBig.height : config.imgSizeSm.height;

	cloudinary.uploader.upload(src_path, function(result) {
		console.log(result)
		if (size == "big") {
			var option = {
				$set: {
					coverimage: result.eager[0].url
				}
			}
		} else {
			var option = {
				$push: {
					image: result.eager[0].url
				}
			}
		}
		Product.findByIdAndUpdate(id, option, function(err) {
			if (err) {
				console.log(err);
				res.end();
			} else {
				res.send(200, {
					message: 'upload success!'
				})
			}
		});
	}, {
		eager: [{
			width: width,
			height: height,
			crop: "fill"
		}]
	});
})

router.get('/:id/del', function(req, res) {
	var id = req.params.id;
	Product.findByIdAndRemove(id, function(err) {
		if (err) {
			console.log(err);
		} else {
			res.send({
				status: 200
			});
		}
	});
})


router.get('/:id', function(req, res) {
	var id = req.params.id;
	Product.findById(id, function(err, doc) {
		if (err) {
			console.log(err);
		} else {
			console.log(doc)
			res.render('product', {
				site: config,
				product: doc
			});
		}
	})
})
module.exports = router;