var express = require('express');
var http = require('http');
var app = express();
var server = http.createServer(app).listen(80);
var mysql = require('mysql');
var request = require('request');
var bodyparser = require("body-parser");
app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());

app.get('/test', function(req, res){
  res.sendfile(__dirname +'/test.html');
});
