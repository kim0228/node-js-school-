var express = require('express');
var http = require('http');
var app = express();
var server = http.createServer(app).listen(80);
var mysql = require('mysql');
var request = require('request');
var cheerio = require('cheerio');


var bodyparser = require("body-parser");
app.use(bodyparser.urlencoded({
  extended: true
}));
app.use(bodyparser.json());

app.get('/menu', function (req, res) {
	res.sendfile('menu.html');
});

app.get('/getMenu', function (req, res) {
  var menu = [];
  request({
    uri:"http://www.kopo.ac.kr/kangseo/content.do?menu=262",
  }
  ,function(err,response,body){
    let $ = cheerio.load(body);
    // var menu = $("td")[2].children[1].children[0].data.replace(/,/gi, "").
    // replace(/\n/gi, "").split(" ");
    // console.log(menu);

    for(i = 2; i < 20; i = i + 4){
      menu.push($("td")[i].children[1].children[0].data.replace(/,/gi, "").
      replace(/\n/gi, "").split(" "));
      //console.log(menu);
    }
    res.send(menu);
  });
});
