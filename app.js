
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
app.set('port', process.env.PORT || 3000);
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

app.get('/',function(req,res){
  for(var i = 0; i < connections.length; i++){
    var target_ws = connections[i];
    var reply = {message:"hoge",name:"fuga"};
    target_ws.send(JSON.stringify(reply));
  }

  res.render('index', { title: 'Express' });
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

/**
 * websocket
 */
var WebSocketServer = require('ws').Server;
var wss = new WebSocketServer({port: 3001});
var connections = [];
console.log('WebSocket server listening on port 3001');
wss.on('connection', function(ws) {
  connections.push(ws);
  console.log('WebSocket connect.');
  ws.on('close', wsOnClose);
  ws.on('message', wsOnMessage);
});

function wsOnMessage(message) {
  try {
    var json = JSON.parse(message);
    console.log('received: %s,%s', json.message,json.name);
    for(var i = 0; i < connections.length; i++){
      var target_ws = connections[i];
      var reply = {message:json.message,name:json.name};
      target_ws.send(JSON.stringify(reply));
    }
  } catch (e) {
    console.log(e);
    return;
  }
}

function wsOnClose() {
  console.log('close');
  connections = connections.filter(function (conn, i) {
    return (conn === ws) ? false : true;
  })
}
