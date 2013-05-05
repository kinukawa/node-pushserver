
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 2999);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/',routes.index);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

/**
 * websocket
 */
var WebSocketServer = require('ws').Server;
var ws_port = 2998;
var wss = new WebSocketServer({port: ws_port});
var authorize = require('./authorize');
var connection = require('./connection');
console.log('WebSocket server listening on port ' + ws_port);
wss.on('connection', function(ws) {
  connection.connections.push(ws);
  console.log('WebSocket connect.');

  ws.on('message', function(message) {
    try {
      var json = JSON.parse(message);
      if (json.authorize){
        authorize.request(json.authorize, null);
      }
    } catch (e) {
      console.log(e);
      return;
    }
  });

  ws.on('close', function (){
    console.log('close');
    connection.connections = connection.connections.filter(function (conn, i) {
      return (conn === ws) ? false : true;
    })
  });

});

