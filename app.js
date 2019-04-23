var express = require('express');
var http = require('http');
var app = express();
var server = http.createServer(app).listen(80);


app.get('/', function (req, res) {
  res.send("main page");
});

app.get('/test', function (req, res) {
  res.send("hello world");
});

app.get('/test3', function (req, res) {
  res.send("hello world2");
});

app.get('/file', function (req, res) {
  res.sendfile("hello.html");
});

app.get('/file2', function (req, res) {
  res.sendfile("회원가입 페이지.html");
});

app.get('/file4', function (req, res) {
  res.sendfile("image/bird.jpg");
});

app.get('/file3', function (req, res) {
  res.sendfile("글쓰기.html");
});

app.get('/table', function (req, res) {
  res.sendfile("table.html");
});

app.get('/css1', function (req, res) {
  res.sendfile("css.html");
});

app.get('/css2', function (req, res) {
  res.sendfile("css실습.html");
});

app.get('/java', function (req, res) {
  res.sendfile("js.html");
});

app.get('/gugu', function (req, res) {
  res.sendfile("4.2 구구단.html");
});

app.get('/move', function (req, res) {
  res.sendfile("4.2 실습1.html");
});

app.get('/42', function (req, res) {
  res.sendfile("4.2 실습.html");
});

app.get('/for', function (req, res) {
  res.sendfile("4.2 for문 사용하기.html");
});

app.get('/array', function (req, res) {
  res.sendfile("4.9 array.html");
});

app.get('/for1', function (req, res) {
  res.sendfile("4.9 for문.html");
});

app.get('/arr2', function (req, res) {
  res.sendfile("4.16 이중배열.html");
});

app.get('/inst', function (req, res) {
  res.sendfile("4.16 객체.html");
});

app.get('/423', function (req, res) {
  res.sendfile("4.23 실습.html");
});

app.get('/calc', function (req, res) {
  res.sendfile("4.23 계산기.html");
});

app.get('/calc1', function (req, res) {
  res.sendfile("4.23 계산기2.html");
});

app.get('/sum1', function (req, res) {
  res.sendfile("4.23 총합구하기.html");
});

app.get('/mid', function (req, res) {
  res.sendfile("김성림_중간고사.html");
});



console.log("running");
