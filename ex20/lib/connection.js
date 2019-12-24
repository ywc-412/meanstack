var mongoose = require('mongoose');
//var db = mongoose.connection;
var dbUrl = 'mongodb://localhost:27017/humanresources';


//db.on('error', function(err) {
//   console.log('there was a problem communicationg with the database');
//});
mongoose.set('useCreateIndex', true);

mongoose.connect(dbUrl, { useNewUrlParser : true }, function(err, mongodb){
   if(err){
      console.log('DB CONNECT X');
      console.error(err.message);
      return ;
   }
   console.log('DB CONNECT OK!!');
});

//Ctrl + C를 누르면 몽구스 연결 종료 처리
process.on('SIGINT', function(){
   mongoose.connection.close(function(){
      console.log('mongoose disconnected');
      process.exit(0);
   });
});

require('../models/employee');
require('../models/team');