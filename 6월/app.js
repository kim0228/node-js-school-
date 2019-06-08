var express = require('express');
var http = require('http');
var app = express();
var server = http.createServer(app).listen(80);

app.get('/test', function (req, res) {
  res.send("hello world");
});

app.get('/test2', function (req, res) {
  console.log(req.query.a, req.query.b,req.query.c)
  res.send("hello world2");
});


app.get('/sum', function (req, res) {
  var num1 = Number(req.query.num1);
  var num2 = Number(req.query.num2);
  var num3 = Number(req.query.num3);
  console.log(num1, num2, num3);    // cmd창에 찍힌다.
  res.send(`gop is ${num1*num2*num3}`); // 4.30 test.html의 response로 돌아감
});

app.get('/getitem', function (req, res) {
  var userPrice = Number(req.query.price);
  var resText = "구매불가";
  var priceTable =
  [{name:"item1", price:1000},
  {name:"item2", price:5000},
  {name:"item3", price:10000},
  {name:"item4", price:30000},
  {name:"item5", price:50000},
  {name:"item6", price:100000},
  {name:"item7", price:500000}];
  for (var i = 0; i<priceTable.length;i++){
    if(priceTable[i].price <= userPrice){
      resText = priceTable[i].name;
      }
  }
  console.log(resText);
  res.send(resText);
});

app.get('/itemform', function (req, res) {
  res.sendfile("4.30 실습.html");
});

app.get('/butt', function (req, res) {
  res.sendfile("5.7 실습.html");
});

app.get('/car', function (req, res) {
  res.sendfile("5.7 차종.html");
});

app.get('/getCarPrice', function (req, res) {
  var carSelect = req.query.carSelect;
  var colorSelect = req.query.colorSelect;
  var carPrice = [2100,1300,1500,3500,3200];
  var colorPrice = [100,120,200,130,80];
  res.send(carPrice[carSelect] + colorPrice[colorSelect] + "만원");
});

app.get('/function', function (req, res) {
  res.sendfile("5.7 함수.html");
});

app.get('/chart', function (req, res) {
  res.sendfile("chart.html");
});




console.log("running");
