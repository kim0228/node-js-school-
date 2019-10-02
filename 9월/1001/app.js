var express = require('express');
var http = require('http');
var app = express();
var server = http.createServer(app).listen(80);
var mysql = require('mysql');
var request = require('request');
var bodyparser = require("body-parser");
app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());


var connection = mysql.createConnection({
  host: 'localhost'
  , port: 3306
  , user: 'root'
  , password: 'root'
  , database: 'webui'
});

app.get('/', function(req, res){
  res.sendfile(__dirname +'/main.html');
});

app.get('/selectItems',function(req, res){
  var selectQuery = `select no, name, price, inventory from item`;
  connection.query(selectQuery,
    function (err, rows, fields){
      if (err) throw err;
      res.send(rows);
    })
});

app.get('/order', function(req, res){
  res.sendfile(__dirname +'/order.html');
});

app.get('/selectItem', function(req, res){
  var no = req.query.no;
  var selectQuery = `select name,price,inventory from item where no = ${no}`;
  connection.query(selectQuery,
  function(err,rows,fields){
    if (err) throw err;
    res.send(rows);
  })
});


app.post('/insertOrder', function(req, res){
  var itemNo = req.body.no;
  var quantity = req.body.quantity;
  var id = req.body.id;
  var inventory = req.body.inventory;
  var insertQuery = `insert ordertable (itemNo,quantity,id) values("${itemNo}","${quantity}",${id})`;
  // var updateQuery = `update item set inventory=${inventory-quantity} where no = ${no}`;
  connection.query(insertQuery,
  function(err,rows,fields){
    if (err) throw err;
    res.send(rows);
  });
});
