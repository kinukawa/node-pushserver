/*
 * receive push notification. 
 */
var SocketManager = require('../SocketManager');

exports.create = function(req, res){
  var user_id = req.body.user_id;
  var data = req.body.data;

  var wsArr = SocketManager.getWebSockets(user_id);
  if (!wsArr){
    res.send("ok");
    return;
  }

  for (var i = 0; i < wsArr.length; i++){
    var ws = wsArr[i];
    ws.send(data);
  }
  res.send("ok");
};
