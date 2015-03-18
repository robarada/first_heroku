var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ArticleSchema = new Schema({
	name: 	  { type: String},
	username: { type: String, required: true},
	content:  { type: String, required: true},
	title: 	  { type: String, required: true},
	createdAt: { type:Date, default:Date.now()}
});


module.exports = mongoose.model('Article', ArticleSchema);