var http = require('http');

exports.request = function(cookie, callback){
  var options = {
    host: 'localhost',
    port: 3000,
    path: '/api/sessions/confirm.json',
    method: 'POST'
  };

  var req = http.request(options, function(res) {
    //console.log('STATUS: ' + res.statusCode);
    //console.log('HEADERS: ' + JSON.stringify(res.headers));
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
      var json = JSON.parse(chunk);
      callback(json.confirm);
    });
  });

  req.on('error', function(e) {
    console.log('problem with request: ' + e.message);
  });

  // write data to request body
  req.write('cookie_string='+cookie);
  req.end();
}
