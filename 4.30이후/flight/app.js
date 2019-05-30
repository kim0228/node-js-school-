var express = require('express');
var http = require('http');
var app = express();
var server = http.createServer(app).listen(80);
var mysql = require('mysql');
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

var connection = mysql.createConnection({
	host: 'localhost'
	, port: 3306
	, user: 'root'
	, password: 'root'
	, database: 'webui'
});



app.get('/flightListPage', function (req, res) {
	res.sendfile("flightListPage.html");
});

app.get('/insertFlightPage', function (req, res) {
	res.sendfile("insertFlightPage.html");
});

app.get('/insertAircraftPage', function (req, res) {
	res.sendfile("insertAircraftPage.html");
});

app.get('/getFullFlightList', function (req, res) {
	var q = `select * from flight f, aircraft a where f.aircraftCode = a.aircraftCode`;
	connection.query(q,
		function (err, rows, fields) {
			if (err) throw err;
			res.send(rows);
		}
	);
});

app.get('/getFlightList', function (req, res) {
	var q = `select * from flight`;
	connection.query(q,
		function (err, rows, fields) {
			if (err) throw err;
			res.send(rows);
		}
	);
});

app.get('/getAircraftList', function (req, res) {
	var q = `select * from aircraft`;
	connection.query(q,
		function (err, rows, fields) {
			if (err) throw err;
			res.send(rows);
		}
	);
});

app.post('/insertFlight', function (req, res) {
	var input = req.body;
	var q = `insert into flight (flightName, aircraftCode, departure, arrival, departTime, arrivalTime) values
	("${input.flightName}", "${input.aircraftCode}", "${input.departure}", "${input.arrival}", "${input.departTime}", "${input.arrivalTime}")`;
	connection.query(q,
		function (err, rows, fields) {
			if (err) throw err;
			res.send(rows);
		}
	);
});

app.post('/insertAircraft', function (req, res) {
	var input = req.body;
	var q = `insert into aircraft (aircraftCode, aircraftName, seats) values
	("${input.aircraftCode}", "${input.aircraftName}", "${input.seats}")`;
	connection.query(q,
		function (err, rows, fields) {
			if (err) throw err;
			res.send(rows);
		}
	);
});

app.post('/deleteFlight', function (req, res) {
	var input = req.body;
	var q = `delete from flight where no=${input.no}`;
	connection.query(q,
		function (err, rows, fields) {
			if (err) throw err;
			res.send(rows);
		}
	);
});

app.post('/deleteAircraft', function (req, res) {
	var input = req.body;
	var q = `delete from aircraft where no=${input.no}`;
	connection.query(q,
		function (err, rows, fields) {
			if (err) throw err;
			res.send(rows);
		}
	);
});
