var express = require('express');
var http = require('http');
var app = express();
var server = http.createServer(app).listen(80);
var request = require('request');

app.get('/', function (req, res) {
	res.sendfile('stockPage.html');
});

app.get('/stockPage', function (req, res) {
	res.sendfile('stockPage.html');
});

app.get('/getStockValue', function (req, res) {
	let url = `https://polling.finance.naver.com/api/realtime.nhn?query=SERVICE_ITEM:${req.query.stockCode}|SERVICE_RECENT_ITEM:${req.query.stockCode}`;
	request.get(url, function (err, response, body) {
			res.send(JSON.parse(body));
		}
	);
});
