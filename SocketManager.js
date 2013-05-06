var WebSocket = require('ws');
var index = [];

exports.setWebsocket = function(websocket, user_id){
  if (index[user_id]){
    wsArray = index[user_id];
    wsArray = removeClosedSocket(wsArray);
    wsArray.push(websocket);
    index[user_id] = wsArray;
  } else {
    var webSockets = [websocket];
    index[user_id] = webSockets;
  }

  console.log("SocketManager.index = " + index);
};

exports.getWebSockets = function(user_id) {
  var webSockets = index[user_id];
  if (webSockets) {
    webSockets = removeClosedSocket(webSockets);
    index[user_id] = webSockets;
    return webSockets;
  } else {
    return null;
  }
};

function removeClosedSocket(arr) {
  return arr.filter(function(ws, i) {
    return (ws.readyState != WebSocket.CLOSED);
  });
}
