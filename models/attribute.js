var mongoose = require('mongoose');
var Schema	=  mongoose.Schema;
var ObjectId = mongoose.Types.ObjectId;

var AttributeSchema = new Schema({
	name : String,
	value : String
});

AttributeSchema.statics = {
	listAttr : function(opt, cb) {
		this.find(opt)
			.exec(cb);
	},
	createAttr : function(item, cb) {
		this.create(item, function(err, doc) {
			if (err) {
				console.log(err);
			} else {
				cb(doc);
			}
		})
	}
}

mongoose.model('Attribute', AttributeSchema);
