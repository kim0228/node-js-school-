var express = require('express');
var http = require('http');
var app = express();
var server = http.createServer(app).listen(80);
var mysql = require('mysql');
var connection = mysql.createConnection({
	host: 'localhost'
	, port: 3306
	, user: 'root'
	, password: 'root'
	, database: 'webui'
});

app.get('/', function (req, res) {
	res.sendfile('page.html');
});
app.get('/page', function (req, res) {
	res.sendfile('page.html');
});

app.get('/getList', function (req, res) {
	var pageCnt = req.query.pageCnt;
	var q = `select * from item order by no desc limit ${10*pageCnt}, 10`;
	connection.query(q,
		function (err, rows, fields) {
			if (err) throw err;
			res.send(rows);
		}
	);
});


app.get('/getListCnt', function (req, res) {

	var q = `select count(*) as totalCnt from item`;
	connection.query(q,
		function (err, rows, fields) {
			if (err) throw err;
			res.send(rows[0]);
		}
	);
});
