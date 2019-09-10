var express = require('express');
var http = require('http');
var app = express();
var server = http.createServer(app).listen(80);
var mysql = require('mysql');
var request = require('request');

var bodyparser = require("body-parser");
app.use(bodyparser.urlencoded({
  extended: true
}));
app.use(bodyparser.json());

var connection = mysql.createConnection({
  host: 'localhost'
  , port: 3306
  , user: 'root'
  , password: 'root'
  , database: 'webui'
});

// -------------------postlist.html-------------------------------------
app.get('/post', function(req, res) {
  res.sendfile('postlist.html')
});

app.get('/read', function(req, res) {
  var selectQuery = `select no,title from post`;
  connection.query(selectQuery,
  function(err, rows, fields){
    if (err) throw err;
    res.send(rows);
  })
});

// -----------------------create.html--------------------------------
app.get('/create', function(req, res) {
  res.sendfile('create.html')
});

app.get('/createform', function(req, res) {
  var title = req.query.title;
  var text = req.query.text;
  var insertQuery = `insert post (title, context) values("${title}","${text}")`;
  connection.query(insertQuery,
  function(err,rows,fields){
    if (err) throw err;
    res.send(rows);
  })
});

// -------------------------detail.html----------------------------------
app.get('/detail', function(req, res) {
  res.sendfile('detail.html')
});

app.get('/read2', function(req, res) {
  var no = req.query.no;
  var selectQuery = `select * from post where no=${no};`;
  connection.query(selectQuery,
  function(err, rows, fields){
    if (err) throw err;
    res.send(rows);
  })
});

app.get('/delete', function(req, res) {
  var no = req.query.no;
  var deleteQuery = `delete from post where no=${no};`;
  connection.query(deleteQuery,
  function(err, rows, fields){
    if (err) throw err;
    res.send(rows);
  })
});

// -------------------------edit.html-----------------------------------
app.get('/edit', function(req, res) {
  var no = req.query.no;
  res.sendfile('edit.html')
});

app.post('/update', function(req, res) {
  var no = req.body.no;
  var title = req.body.title;
  var context = req.body.context;
  var updateQuery = `update post set title="${title}", context="${context}"
  where no=${no};`;
  connection.query(updateQuery,
  function(err, rows, fields){
    if (err) throw err;
    res.send(rows);
  })
});

console.log("running");
