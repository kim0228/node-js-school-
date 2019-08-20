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


// 기말고사------------------------------------------------------------------------------

  // 삼성전자
  app.get('/samsungelec', function(req, res) {
    request.get(`https://polling.finance.naver.com/api/realtime.nhn?query=
      SERVICE_ITEM:005930|SERVICE_RECENT_ITEM:005930,018260,009540,035720`, function(err, response, body) {
    body = JSON.parse(body);
    var price = body.result.areas[0].datas[0].nv + ""
    console.log(price)
    var insertQuery = `insert samsungelectronic (price) values("${price}")`;
    connection.query(insertQuery,
    function (err,rows,fields){
    res.send(rows);
    });
    });
  });

  app.get('/hyundai', function(req, res) {
    request.get(`https://polling.finance.naver.com/api/realtime.nhn?query=
      SERVICE_ITEM:009540|SERVICE_RECENT_ITEM:009540,005930,035720,018260`, function(err, response, body) {
    body = JSON.parse(body);
    var price = body.result.areas[0].datas[0].nv + ""
    var insertQuery = `insert hyundai (price) values("${price}")`;
    connection.query(insertQuery,
    function (err,rows,fields){
    res.send(rows);
    });
    });
  });

  // 삼성sds
  app.get('/samsungsds', function(req, res) {
    request.get(`https://polling.finance.naver.com/api/realtime.nhn?query=
      SERVICE_ITEM:018260|SERVICE_RECENT_ITEM:018260,009150,035720,005930,009540`, function(err, response, body) {
    body = JSON.parse(body);
    var price = body.result.areas[0].datas[0].nv + ""
    var insertQuery = `insert hyundai (price) values("${price}")`;
    connection.query(insertQuery,
    function (err,rows,fields){
    res.send(rows);
    });
    });
  });

  app.get('/kakao', function(req, res) {
    request.get(`https://polling.finance.naver.com/api/realtime.nhn?query=
    SERVICE_ITEM:035720|SERVICE_RECENT_ITEM:035720,009150,005930,018260,009540`, function(err, response, body) {
    body = JSON.parse(body);
    var price = body.result.areas[0].datas[0].nv + ""
    var insertQuery = `insert hyundai (price) values("${price}")`;
    connection.query(insertQuery,
    function (err,rows,fields){
    res.send(rows);
    });
    });
  });



  // 삼성전기
  app.get('/samsung', function(req, res) {
    request.get(`https://polling.finance.naver.com/api/realtime.nhn?query=
    SERVICE_ITEM:009150|SERVICE_RECENT_ITEM:009150,005930,018260,009540,035720`, function(err, response, body) {
    body = JSON.parse(body);
    var price = body.result.areas[0].datas[0].nv + ""
    console.log(price)
    var insertQuery = `insert samsungelectronic (price) values("${price}")`;
    connection.query(insertQuery,
    function (err,rows,fields){
    res.send(rows);
    });
    });
  });
