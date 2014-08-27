var site = require('./routes/site');
var cms = require('./routes/cms');

module.exports = function(app) {
	app.get('/', site.initIndex);
	app.get('/cms', cms.index);
	app.post('/addattr', cms.addAttr);
}
// module.exports = function(app) {
// 	app.use('/', site);
// }