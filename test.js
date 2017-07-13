
var fs = require('fs')
var http = require('http')

var file = fs.createWriteStream('qweqwe.txt');
http.get('http://172.21.19.60', function(response) {
    response.pipe(file);
    file.on('finish', function() {
      console.log('download finish');
      file.close();  // close() is async, call cb after close completes.
    });
  }).on('error', function(err) { // Handle errors
    console.log('download error');
    console.log(err);
  });


