var mysql = require('mysql');
var pool  = mysql.createPool({
  host     : 'localhost',
  user     : 'toss',
  password : 'password',
  database : 'toss'
});

pool.getConnection(function(err, connection) {
  connection.query( 'SELECT * FROM users', function(err, rows) {
    console.log(rows);
    connection.end();
  });
});
