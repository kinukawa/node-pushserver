
/*
 * GET home page.
 */

var connection = require('../connection');
exports.index = function(req, res){
  for(var i = 0; i < connection.connections.length; i++){
    var target_ws = connection.connections[i];
    var reply = {message:"hoge",name:"fuga"};
    target_ws.send(JSON.stringify(reply));
  }
  res.render('index', { title: 'Express' });
};
