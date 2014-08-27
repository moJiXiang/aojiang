var mongoose = require('mongoose');
var Schema	=  mongoose.Schema;
var ObjectId = mongoose.Types.ObjectId;

var AttributeSchema = new Schema({
	name : String,
	value : String
});

AttributeSchema.statics = {
	CreateAttr : function() {
		this.create({})
	}
}

mongoose.model('Attribute', AttributeSchema);
