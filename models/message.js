var mongoose = require('mongoose');
var Schema	=  mongoose.Schema;
var ObjectId = mongoose.Types.ObjectId;

var MessageSchema = new Schema({
	title : String,
	content : String,
	image : String,
	isindustry : Boolean, // this flage judge is industry
	author : {type : String, default : 'aojiang'},
	createat : {type : Date , default : Date.now}
})

MessageSchema.statics = {
	createMsg : function(item, cb) {
		this.create(item, function(err, doc){
			if(err) {
				console.log(err);
			} else {
				cb(doc);
			}
		})
	},
	listMsg : function(opt, cb) {
		var criteria = {isindustry : opt.isindustry};
		this.find(criteria)
			.limit(opt.limit)
			.exec(cb);
	}
}
mongoose.model('Message', MessageSchema);