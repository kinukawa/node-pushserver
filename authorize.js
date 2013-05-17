var http = require('http');
var settings = require('settings');

exports.request = function(cookie, callback){
  var post_data = 'cookie_string='+cookie;
  var options = {
    host: settings.rails_host,
    port: settings.rails_port,
    path: settings.confirm_path,
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': post_data.length
    }
  };

  var req = http.request(options, function(res) {
    //console.log('STATUS: ' + res.statusCode);
    //console.log('HEADERS: ' + JSON.stringify(res.headers));
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
      var json = JSON.parse(chunk);
      callback(json);
    });
  });

  req.on('error', function(e) {
    console.log('problem with request: ' + e.message);
  });

  // write data to request body
  req.write(post_data);
  req.end();
}
