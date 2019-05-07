var express = require('express');
var http = require('http');
var app = express();
var server = http.createServer(app).listen(80);
var mysql = require('mysql');


var connection = mysql.createConnection({
  host: 'localhost'
  , port: 3306
  , user: 'root'
  , password: 'root'
  , database: 'webui'
});

app.get('/select', function (req, res) {
  var selectQuery = `select * from news`;
  connection.query(selectQuery,
  function (err, rows, fields) {
    if (err) throw err;
    console.log(rows);
    res.send(rows);
  }
)
});
