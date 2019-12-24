var express = require('express');
var mongoose = require('mongoose');
var Employee = mongoose.model('Employee');
var Team = mongoose.model('Team');
var router = express.Router();

// 팀 목록 출력
router.get('/teams',function(req, res, next){
	Team.find().sort('name').exec(function(error, results){
		if(error){
			return next(error);
		}
		res.json(results);
	});
});



router.get('/teams/:teamId',function(req,res,next){
	Team.findOne({
		_id : req.params.teamId
	},function(error, results){
		if(error){
			return next(error);
		}
		if(!results){
			res.send(404);
		}
		
		res.json(results);
	});
});

module.exports = router;