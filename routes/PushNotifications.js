/*
 * receive push notification. 
 */
var SocketManager = require('../SocketManager');

exports.create = function(req, res){
  var user_id = req.body.user_id;
  var data = req.body.data;

  console.log(user_id)
  for (var i = 0; i < user_id.length; i++){
    var wsArr = SocketManager.getWebSockets(user_id[i]);
    if (!wsArr){
      res.send("ok");
      continue;
    }

    for (var j = 0; j < wsArr.length; j++){
      var ws = wsArr[j];
      ws.send(JSON.stringify(data));
    }
  }
  res.send("ok");
};
