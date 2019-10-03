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

app.get('/factorial', function(req, res) {
  var num = req.query.number;
  var answer = 1;
  for(var i = 1;i<=num;i++){
    answer = answer * i;
  }
  res.send("factorial : " + answer);
});

// 테이블에 데이터 삽입
app.get('/database', function(req, res) {
  var title = req.query.title;
  var text = req.query.text;
  var insertQuery = `insert post (title, context) values("${title}","${text}")`;
connection.query(insertQuery,
  function(err, rows, fields){
    if (err) throw err;
    res.send(rows);
  })
});

app.get('/form', function(req, res) {
  res.sendfile('form.html')
});

// 삭제 버튼 누르면 작동하는 부분
app.get('/delete', function(req, res) {
  var number = req.query.number;
  var deleteQuery = `delete from post where no='${number}'`;
connection.query(deleteQuery,
  function(err, rows, fields){
    if (err) throw err;
    res.send(rows);
  })
});

app.get('/select', function(req, res){
  var no = req.query.no;
  var selectQuery = `select * from post`;
  connection.query(selectQuery,
  function (err, rows, fields){
    if (err) throw err;
    res.send(rows);
  })
});

app.get('/currentSelect', function(req, res){
  var no = req.query.no;
  var selectQuery = `select * from post`;
  connection.query(selectQuery,
  function (err, rows, fields){
    res.send(rows);
  })
});

app.get('/update', function(req, res){
  var no = req.query.no;
  var title = req.query.title;
  var text = req.query.text;
  var updateQuery = `update post set title="${title}", context="${text}"
  where no=${no}`;
  connection.query(updateQuery,
  function (err, rows, fields){
    res.send(rows);
  })
});

app.get('/updateform', function(req, res) {
  res.sendfile('updateform.html')
});
// --------------------------다른 파일---------------------------
app.get('/list', function(req, res) {
  res.sendfile('list.html')
});
// --------------데이터 조회-------------------------------------------
app.get('/read', function(req, res) {
  var no = req.query.no;
  var title = req.query.title;
  var selectQuery = `select * from post`;
  connection.query(selectQuery,
  function(err, rows, fields){
    if (err) throw err;
    res.send(rows);
  })
});
// -----------------------데이터 삽입 단계---------------------------------
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
// -------------------------수정 단계----------------------------
app.get('/update2', function(req, res) {
  res.sendfile('update.html')
});

app.get('/updateform2', function(req, res) {
  var no = req.query.no;
  var title = req.query.title;
  var text = req.query.text;
  var updateQuery = `update post set title="${title}", context="${text}"
  where no=${no}`;
  connection.query(selectQuery,
  function(err, rows, fields){
    if (err) throw err;
    res.send(rows);
  })
});



console.log("running");
