var express = require('express');
var mongoose = require('mongoose');
var Employee = mongoose.model('Employee');
var Team = mongoose.model('Team');
var router = express.Router();

// 전체 직원 목록 반환
router.get('/employees', function(req, res, next){
   Employee.find().sort('id').exec(function(error, results){
      if(error){
         return next(error);
      }
      res.json(results);
   });
});


// 직원 하나 반환 함수
router.get('/employees/:employeeId', function(req, res, next) {
   Employee.findOne({ id : req.params.employeeId }).populate('team').exec(function(error, results){
      if(error){
         return next(error);
      }
      if(!results){
         // 찾는 사용자가 없으면 404 반환
         res.send(404);
      }
      res.json(results);
   });
});

router.put('/employees', function(req, res, next){
   
   Employee.updateOne({
      id : req.body.id
   }, req.body, function(err, numberAffected, response){
      if(err){
         return res.send(err);
      }
      Employee.findOne({id : req.body.id}).exec(function(err, results){
    	 if(err){
    		 return next(err);
    	 } 
    	 if(!results){
    		 return res.send(404);
    	 }
    	 res.json(results);
      });
   });
});

//직원 추가
router.post('/employees', function(req, res, next){
   Employee.create(req.body, function(err, response){
      Employee.findOne({ id : req.body.id })
               .populate('employee')
               .exec(function(err, results){
                  if(err){
                     return next(err);
                  }
                  if(!results){
                     res.send(404);
                  }
                  res.json(results);
               });
            });
}); // END 직원 추가

// 직원 삭제
router.delete('/employees/:employeeId', function(req, res, next){
   Employee.deleteOne({id : req.params.employeeId }, function(err, response){
      Employee.find().sort('id').exec(function(err, results){
         if(err){
            return next(err);
         }
         res.json(results);
      });
   });
});

module.exports = router;