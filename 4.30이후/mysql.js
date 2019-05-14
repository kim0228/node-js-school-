var express = require('express');
var http = require('http');
var app = express();
var server = http.createServer(app).listen(80);
var mysql = require('mysql');

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

app.get('/select', function (req, res) {

  var no = req.query.no;
  // var selectQuery = `select * from news`;
  console.log(selectQuery);
  connection.query(selectQuery, function (err, rows, fields) {
    if (err) throw err;
    console.log(rows)
  })
});

app.get('/form', function(req, res) {
  res.sendfile('5.14 실습.html');
});

// 테이블 조회
app.get('/dbSelectTest', function(req, res){
  var selectQuery = `select * from news`;

  connection.query(selectQuery,
  function (err, rows, fields){
    res.send(rows);
  })
});

app.get('/newList', function(req, res) {
  res.sendfile('newList.html');
});

// post방식일 때 데이터 삽입
app.post('/newList1', function(req, res) {
  var title = req.body.title;
  var text = req.body.text;
  var selectQuery1 = `insert news (title,text) values("${title}","${text}")`;
  connection.query(selectQuery1,
  function (err, rows, fields){
    res.send(rows);
  });
});

// get방식일 때 데이터 삽입
app.get('/newList2', function(req, res) {
  var title = req.query.title;
  var text = req.query.text;
  var selectQuery1 = `insert news (title,text) values("${title}","${text}")`;
  connection.query(selectQuery1,
  function (err, rows, fields){
    res.send(rows);
  });
});

// 테이블 값 입력
app.get('/newwrite', function(req, res) {
  res.sendfile('newwrite.html');
});

// html에 테이블 값 입력
app.get('/newswrite', function(req, res) {
  res.sendfile('newswrite.html');
});

// 테이블 데이터 삭제 쿼리
app.get('/newList3', function(req, res) {

  var selectQuery2 = `delete from news`;
  connection.query(selectQuery2,
  function (err, rows, fields){
    res.send(rows);
  });
});

app.get('/newsdel', function(req, res) {
  res.sendfile('newsdelete.html');
});

// 삭제 버튼 눌러서 테이블 넘버 삭제
app.get('/newList4', function(req, res) {
  var number = req.query.number;
  var selectQuery2 = `delete from news where no='${number}'`;
  connection.query(selectQuery2,
  function (err, rows, fields){
    res.send(rows);
  });
});




// app.get('/dbSelect', function(req, res) {
//   var selectQuery3 = `select * from news`;
//
//   connection.query(selectQuery3,
//   function (err, rows, fields){
//     res.send(rows);
//   })
// });
