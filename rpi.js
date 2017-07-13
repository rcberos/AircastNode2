var async = require('async')
var needle = require('needle')
var fs = require('fs')
var express = require('express')
var path = require('path')
var http = require('http')
// var config = require('config')



var app = express()

app.set('port', process.env.PORT || 3000);
app.use('/css', express.static(path.join(__dirname+'/css')));
app.use('/scripts', express.static(path.join(__dirname+'/scripts')));
app.use('/images', express.static(path.join(__dirname+'/images')));
app.use('/config', express.static(path.join(__dirname+'/config')));
app.use('/templates', express.static(path.join(__dirname+'/templates')));
app.use('/lib', express.static(path.join(__dirname+'/lib')));
app.use('/Aircast', express.static(path.join(__dirname+'/Aircast')));
app.use('/font', express.static(path.join(__dirname+'/font')));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'slm');

app.get('/', function (req, res) {
  res.sendFile('rpi.html', {root: path.join(__dirname, '/')});
})


app.listen(app.get('port'), function () {
  console.log('Example app listening on port: '+app.get('port'))
})


var download = function(url, dest, cb) {
  var file = fs.createWriteStream(dest);
  var request = http.get(url, function(response) {
    response.pipe(file);
    file.on('finish', function() {
      console.log('download finish');
      file.close(cb);  // close() is async, call cb after close completes.
    });
  }).on('error', function(err) { // Handle errors
    cb('failed');
    console.log('download error');
    fs.unlink(dest); // Delete the file async. (But we don't check the result)
    // if (cb) cb(err.message);
    console.log(err);
  });
};


var checkNewFiles = function(){
  var RPICONFIG = require(path.join(__dirname, 'config/default.json'));
  // console.log(obj);
  console.log('check file');
  var opt = {
   headers: { 'Content-Type': 'application/json' },
   open_timeout: 60000
  }
  var data = {
    RpiID: RPICONFIG.RpiID
  }
  needle.post(RPICONFIG.RpiServer+'rpiCheckFiles', data, opt, function(err, resp) {
    if(err){
      console.log('rpiUpdate: '+err);

      setTimeout(function(){
          checkNewFiles();
        }, 5000);
    }
    else{
      console.log(resp.body)

      console.log('async download start');
      var valueFiles = [];
      console.log(resp.body['value']);
      async.each(resp.body.value, function(file, callback) {
        // console.log('file download start');
        valueFiles.push(file);
        download('http://s3-ap-southeast-1.amazonaws.com/rpitv/Aircast/'+file.FileName, 'Aircast/'+file.FileName, callback);
      }, function(err) {
          if( err ) {
            console.log('A file failed to process');
            setTimeout(function(){
                checkNewFiles();
              }, 5000);
          } else {
            var RPICONFIG = require(path.join(__dirname, 'config/default.json'));

            var data = {
              RpiID: RPICONFIG.RpiID,
              value: resp.body.value
            }
            console.log(valueFiles);

            needle.post(RPICONFIG.RpiServer+'rpiUpdateFiles', data, opt, function(err, resp) {
              if(err){
                console.log('rpiUpdate: '+err);
              }
              else{
                console.log(resp.body);
              }

              setTimeout(function(){
                checkNewFiles();
              }, 5000);

            })

            
            console.log('All files have been processed successfully');
          }



      });

      console.log("UPDATED");
    }
  });
}

checkNewFiles();
