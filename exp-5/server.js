var http = require('http');

var fs=require('fs');

http.createServer(function (req, res) {

res.writeHead(200, {'Content-Type': 'text/html'});

var myreadSt=fs.createReadStream('index.html');

myreadSt.pipe(res);

}).listen(4001);