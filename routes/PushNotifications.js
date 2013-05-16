/*
 * receive push notification. 
 */
var SocketManager = require('../SocketManager');

exports.create = function(req, res){
  var user_id = req.body.user_id;
  var data = req.body.data;

  for (var i = 0; i < user_id.length; i++){
    var wsArr = SocketManager.getWebSockets(user_id[i].event_participant.user_id);
    if (!wsArr){
      res.send("ok");
      continue;
    }

    for (var j = 0; j < wsArr.length; j++){
      var ws = wsArr[j];
      console.log(ws);
      ws.send(JSON.stringify(data));
    }
  }
  res.send("ok");
};
