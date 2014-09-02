var pkg = require('./package.json');

var config = {
	name : "澳江紧固件制造有限公司",
	description : "专业制造T型钉",
	version : pkg.version,
	db : "mongodb://localhost/aojiang",
	db_name : "aojiang",
	imgSizeBig : {width: 1170, height: 350},
	imgSizeSm : {width: 300, height: 150}
};

module.exports.config = config;

