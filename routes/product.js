var express = require('express');
var router = express.Router();
var async = require('async');
var Product = require('../models').Product;
/** this npm package modify req.files**/
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
var UPYun = require('../upyun/upyun').UPYun;
var config = require('../config').config;

var md5 = require('md5');
var mongoose = require('mongoose');
var gm = require('gm'),
	fs = require('fs'),
	imageMagick = gm.subClass({
		imageMagick: true
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
	var imgname = validPic(req.files.img.type);

	var width = size == "big" ? config.imgSizeBig.width : config.imgSizeSm.width;
	var height = size == "big" ? config.imgSizeBig.height : config.imgSizeSm.height;

	var arr = src_path.split('/');
	arr.shift();
	arr[arr.length - 1] = imgname;
	var src_path_name = '';
	arr.forEach(function(a) {
		src_path_name += '/' + a;
	})
	var target_path_name = size == "big" ? "/lg/" + imgname : "/sm/" + imgname;
	if (size == "big") {
		var option = {
			$set: {
				coverimage: imgname
			}
		}
	} else {
		var option = {
			$push: {
				image: imgname
			}
		}
	}
	console.log(src_path_name, target_path_name)

	imageMagick(src_path)
		.resize(width, height, '!') //加('!')强行把图片缩放成对应尺寸150*150！
		.autoOrient()
		.write(src_path_name, function(err) {
			console.log('&&&*****************')
			upToYun(src_path_name, target_path_name, function(err, result) {
				if (err)
					console.log(err);
				else {
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
				}
			})
		})


	// imageMagick(path)
	// .resize(width, height, '!') //加('!')强行把图片缩放成对应尺寸150*150！
	// .autoOrient()
	// .write(writepath + imgname, function(err){
	// 	if (err) {
	// 		console.log(err);
	// 		res.end();
	// 	} else {
	// 		fs.unlink(path, function() {
	// 			return res.end();
	// 		});
	// 		if(size == "big"){

	// 			Product.findByIdAndUpdate(id, {$set:{coverimage : imgname }}, function(err) {
	// 				if(err) {
	// 					console.log(err);
	// 					res.end();
	// 				}
	// 			});
	// 		} else {
	// 			console.log(size);
	// 			Product.findByIdAndUpdate(id, {$push:{image : imgname}}, function(err) {
	// 				if(err) {
	// 					console.log(err);
	// 					res.end();
	// 				}
	// 			});
	// 		}
	// 	}
	// });
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