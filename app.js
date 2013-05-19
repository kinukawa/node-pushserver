
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , PushNotifications = require('./routes/PushNotifications')
  , http = require('http')
  , path = require('path')
  , settings = require('./settings');

var app = express();

// all environments
app.set('port', process.env.PORT || settings.express_port);
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
app.post('/',PushNotifications.create);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

/**
 * websocket
 */
var WebSocketServer = require('ws').Server;
var ws_port = settings.ws_port;
var wss = new WebSocketServer({port: ws_port});
var authorize = require('./authorize');
var SocketManager = require('./SocketManager');

console.log('WebSocket server listening on port ' + ws_port);
wss.on('connection', function(ws) {
  console.log('WebSocket connect.');

  ws.on('message', function(message) {
    try {
      //console.log(message);
      var json = JSON.parse(message);
      if (json.authorize){
        authorize.request(json.authorize, function(response){
          if (response.confirm){
            ws.send("{\"authorize\":\"true\"}");
            SocketManager.setWebsocket(ws, response.user.id);
          }else{
            ws.send("{\"authorize\":\"false\"}");
            ws.terminate();
          }
        });
      }
    } catch (e) {
      console.log(e);
      return;
    }
  });

  ws.on('error', function (error){
    console.log(error);
  });

  ws.on('close', function (){
    console.log('close');
  });

});

