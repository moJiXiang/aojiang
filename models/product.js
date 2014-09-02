var mongoose = require('mongoose');
var Schema	=  mongoose.Schema;
var ObjectId = mongoose.Types.ObjectId;

var ProductSchema = new Schema({
	name : String,
	image: Array,
	main : Boolean, //是否主要产品
	classes : String, //类别
	applyrange : {type:String}, //应用范围
	unitprice : Number,//单价
	custom : Boolean, //加工定制
	sample : Boolean, //样品还是现货
	headform : String, //头型
	standardtype : String, //标准类型
	standardnum : String, //标准编号
	type : String, //型号
	groove : String, //槽型
	screwthreads : String, //螺纹规格
	action : String, //作用方式
	length : String, //公称长度
	// width : String, //对边宽度
	// height : String, //高度
	material : String, // 材料
	materialgrade : String, //材料等级
	surfacetreatment : String, //表面处理
})

ProductSchema.statics = {
	/**
	 * find main products in documents
	 * @param  {Object}   opt query obj
	 * @param  {Function} cb  callback function
	 * @return {array}       return product array
	 */
	listProduct : function(opt, cb) {
		var criteria = opt.main ? { main: opt.main } : {};
		this.find(criteria)
			.limit(opt.limit)
			.exec(cb);
	},
	createPro : function(item, cb) {
		this.create(item, function(err, doc) {
			if (err) {
				console.log(err);
			} else {
				cb(doc);
			}
		})
	}
}
mongoose.model('Product', ProductSchema);

