var fs = require('fs');
var colors = require('colors');

// 404 - 요청한 파일이 없는 경우
// 맨 밑에 exports.send404 = send404
// 형태가 아니라 바로 exports해서 외부에서도 사용가능하게 해준다.
exports.send404 = function(res){
   console.error('404 NOT FOUND'.blue);
   res.writeHead(404, {'Content-Type' : 'text/plain'});
   res.end('요청한 자원이 없습니다.');
}

// 500 오류가 난 경우
exports.send500 = function(err, res){
   console.error(err.blue);
   res.writeHead(500, {'Content-Type' : 'text/plain'});
   res.end(err);
}

// 정상적으로 데이터가 온 경우
exports.sendJson = function(data, res){
   res.writeHead(200, {'Content-Type' : 'application/json'});
   res.end(JSON.stringify(data));
}

exports.staticFile = function(path){
   // 정적 파일 요청 처리
   return function(data, res){
      var readStream;
      
      // home과 home.html 모두 동작하게 만듦
      data = data.replace(/^(\/home)(.html)?$/i, '$1.html');
      data = '.' + path + data;
      
      fs.stat(data, function(err, stats){
         if(err || stats.isDirectory()){
            return exports.send404(res);
         }
         readStream = fs.createReadStream(data);
         return readStream.pipe(res);
      });
   };
};