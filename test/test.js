var should = require("should");
var assert = require("assert");
describe('SocketManager', function(){
  var WebSocket = require('ws');
  var SocketManager = require('../SocketManager');
  it('指定したインデックスにセットできること', function(){
    for (var i = 1; i <= 10; i++){ 
      var dummyWs = {};
      var user = {id:i};
      dummyWs.readyState = 0;
      SocketManager.setWebsocket(dummyWs, user);
    }

    var wsa = SocketManager.getWebSockets(0);
    assert.equal(wsa,null);

    for (var i = 1; i <= 10; i++){ 
      var wsa = SocketManager.getWebSockets(i);
      wsa.should.an.instanceOf(Array); 
      wsa.length.should.equal(1);
    }

    var wsa = SocketManager.getWebSockets(11);
    assert.equal(wsa,null);
  });

  it('あるインデックスに複数のwebsocketをセットできること', function(){
    var dummyWs = {};
    var user = {id:3};
    dummyWs.readyState = 0;
    SocketManager.setWebsocket(dummyWs, user);
    dummyWs = {};

    user = {id:5};
    dummyWs.readyState = 0;
    SocketManager.setWebsocket(dummyWs, user);

    user = {id:7};
    dummyWs.readyState = 0;
    SocketManager.setWebsocket(dummyWs, user);

    for (var i = 1; i <= 10; i++){ 
      var wsa = SocketManager.getWebSockets(i);
      wsa.should.an.instanceOf(Array); 
      if (i == 3 ||
        i == 5 ||
        i == 7)
      {
        wsa.length.should.equal(2);
      }else{
        wsa.length.should.equal(1);
      }
    }
  });

  it('websocketのreadyStateがCLOSEDのオブジェクトは適当なタイミングで破棄されるべき', function(){

    var wsa = SocketManager.getWebSockets(3);
    wsa[0].readyState = WebSocket.CLOSED;

    wsa = SocketManager.getWebSockets(5);
    wsa[0].readyState = WebSocket.CLOSED;

    wsa = SocketManager.getWebSockets(7);
    wsa[0].readyState = WebSocket.CLOSED;

    for (var i = 1; i <= 10; i++){ 
      var wsa = SocketManager.getWebSockets(i);
      wsa.length.should.equal(1);
    }
  });
});
