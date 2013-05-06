var should = require("should");
describe('socket-manager', function(){
  var ws = require('ws');
  var socketManager = require('../SocketManager');
  var websocket = new ws('ws://localhost/');
  console.log(websocket);
  console.log(ws.CLOSED);
  //socketManager.setWebsocket(
})
