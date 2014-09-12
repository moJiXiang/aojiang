require.config({
	baseUrl : 'js',
	paths : {
		'jquery' : 'jquery',
		'handlebars' : 'handlebars-v1.3.0'
	},
	shim : {
		"handlebars" : {
			exports : 'Handlebars'
		}
	}
})

define(['jquery', 'handlebars', "text!/template/product.hbs", "text!/template/attribute.hbs", "text!/template/message.hbs", 'jquery.ui.widget', 'jquery.iframe-transport', 'jquery.fileupload','../javascripts/header'], function($, Handlebars, productView, attributeView, messageView){
	/**
	 * add new product
	 */
	$('#saveproduct').click(function() {
		
		var product = $('form.product').serializeArray();
		console.log(product);
		$.post('/product/add', product, function (data) {
			if(data.status == 200){
				console.log(data.result);
				var tr = Handlebars.compile(productView)(data.result);
				console.log(tr);
				$('#productstable').children('tbody').append(tr);
				$('#newproductModal').modal('hide');
			}
		})
	})
	/**
	 * del a product
	 */
	$('.delpro').click(function () {
		var id = $(this).attr('data-id');
		console.log(id);
		var element = $(this).parent().parent();
		$.get('/product/'+ id + '/del', function (data) {
			console.log(typeof(data.status));
			if(data.status == 200) {
				element.remove();
			}
		})
	})

	$('.fileupload').fileupload()

	// $('.upload').click(function() {
	// 	var url = "product/upload/" + $(this).attr('data-id');
	// 	$(this).upload({
	//         action: url, //上传地址
	//         fileName: "file",    //文件名称。用于后台接收
	//         params: {},         //参数
	//         accept: ".jpg,.png",     //文件类型
	//         complete: function () {  //上传完成
	//             alert("complete");
	//         },
	//         submit: function () {   //提交之前
	//             alert("submit");
	//         }
	//     });
	// })
	// $(".fileupload").fileupload({
	// 	dataType : json
	// });

	$('#saveattr').click(function() {
		var attr = $('form.attribute').serializeArray();
		console.log(typeof(attr));
		$.post('/attribute/add', attr, function(data) {
			if(data.status == 200){
				var tr = Handlebars.compile(attributeView)(data.result);
				$('#attributetable').children('tbody').append(tr);
				$('#newAttribute').modal('hide');
			}
		})
	})
	$('.delattr').click(function () {
		var id = $(this).attr('data-id');
		var element = $(this).parent().parent();
		$.get('/attribute/'+ id + '/del', function (data) {
			console.log(typeof(data.status));
			if(data.status == 200) {
				element.remove();
			}
		})
	})

	$('#savemsg').click(function() {
		var msg = $('form.message').serializeArray();
		$.post('/message/add', msg, function(data) {
			if(data.status == 200) {
				var tr = Handlebars.compile(messageView)(data.result);
				$('#messagestable').children('tbody').append(tr);
				$('#newmessageModal').modal('hide');
			}
		})
	})
})