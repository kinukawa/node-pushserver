var websocket = require('ws');
var index = [];

exports.setWebsocket = function(websocket, user){
  if (index[user.id]){
    wsArray = index[user.id];
    wsArray = wsArray.filter(function(ws, i) {
      return (ws.readyState != websocket.CLOSED);
    });
  }
};
