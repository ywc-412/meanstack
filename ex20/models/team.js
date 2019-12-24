var mongoose = require('mongoose');
var postFind = require('mongoose-post-find');
var async = require('async');
var Schema = mongoose.Schema;

var TeamSchema = new Schema({
	name	:	{ type: String, required: true},
	members	:	{ type: [Schema.Types.Mixed]}
});

function _attachMembers(Employee, result, callback){
	Employee.find({team: result._id}, function(err, employees){
		if(err){
			return callback(err);
		}
		result.members = employees;
		callback(null, result);
	});//END find()
}// END _attachMembers()

TeamSchema.plugin(postFind, {
	//find() 호출될 때 실행
	find : function(result, callback){
		var Employee = mongoose.model('Employee');
		async.each(result, 
			function(item, callback){
				_attachMembers(Employee, item, callback);
			},
			function(err){
				if(err){
					return callback(err);
				}
				callback(null, result);
			}
		);
	},
	//findOne() 호출될 때 실행
	findOne : function(result, callback){
		var Employee = mongoose.model('Employee');
		_attachMembers(Employee, result, callback);
	}
});	//END plugin

module.exports = mongoose.model('Team', TeamSchema);