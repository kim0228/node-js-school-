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
  var writer = req.query.writer;
  var selectQuery1 = `insert news (writer, title, text) values("${writer}","${title}","${text}")`;
  connection.query(selectQuery1,
  function (err, rows, fields){
    res.send(rows);
  });
});

// 테이블 값 입력
app.get('/newwrite', function(req, res) {
  res.sendfile('newwrite.html');
});

// newList.html에 테이블에 입력한값이 화면에 나오게 함.
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


// 삭제 버튼 눌러서 테이블 넘버에 해당되는 줄 삭제
app.get('/newList4', function(req, res) {
  var number = req.query.number;
  var selectQuery2 = `delete from news where no='${number}'`;
  connection.query(selectQuery2,
  function (err, rows, fields){
    res.send(rows);
  });
});

app.get('/update', function(req, res) {
  res.sendfile('5.21 update.html');
});

// post방식으로 데이터 업데이트
app.post('/edit', function(req, res) {
  var no = req.body.no;
  var writer = req.body.writer;
  var title = req.body.title;
  var text = req.body.text;
  var updateQuery = `update news set writer="${writer}", title="${title}", text="${text}"
  where no=${no}`;
  connection.query(updateQuery,
  function (err, rows, fields){
    res.send(rows);
  });
});

// 데이터 조회
app.get('/getUpdateNews', function(req, res) {
  var no = req.query.no;
  var selectQuery = `select * from news where no=${no}`;
  connection.query(selectQuery,
  function (err, rows, fields){
    res.send(rows);
  })
});

// ----------------------------------------------------------------------------------
app.get('/flightList', function(req, res) {
  res.sendfile('flightList.html');
});

app.get('/insertFlight', function(req, res) {
  res.sendfile('insertFlight.html');
});

app.get('/insertAircraft', function(req, res) {
  res.sendfile('insertAircraft.html');
});


app.get('/flightInsert', function(req, res) {
  var flightName = req.query.flightName;
  var aircraftCode = req.query.aircraftCode;
  var departure = req.query.departure;
  var arrival = req.query.arrival;
  var departTime = req.query.departTime;
  var arrivalTime = req.query.arrivalTime;
  var insertQuery = `insert flight (flightName, aircraftCode, departure, arrival, departTime, arrivalTime)
  values("${flightName}","${aircraftCode}","${departure}","${arrival}","${departTime}","${arrivalTime}")`;
  connection.query(insertQuery,
  function (err, rows, fields){
    res.send(rows);
  });
});

app.get('/aircraftInsert', function(req, res){
  var aircraftCode = req.query.aircraftCode;
  var aircraftName = req.query.aircraftName;
  var seats = req.query.seats;
  var insertQuery1 = `insert aircraft (aircraftCode, aircraftName, seats)
  values("${aircraftCode}","${aircraftName}","${seats}")`;
  connection.query(insertQuery1,
    function (err, rows, fields){
      res.send(rows);
    })
  });

app.get('/flightSelect', function(req, res){
  var joinQuery = `select * from flight a, aircraft b where a.aircraftCode = b.aircraftCode;`;
  connection.query(joinQuery,
  function (err, rows, fields){
    res.send(rows);
  })
});

app.get('/aircraftSelect', function(req, res){
  var selectQuery1 = `select * from aircraft`;
  connection.query(selectQuery1,
    function (err, rows, fields){
      res.send(rows);
    })
  });

app.get('/flightDelete', function(req, res) {
  var number = req.query.number;
  var deleteQuery = `delete from flight where no='${number}'`;
  connection.query(deleteQuery,
    function (err, rows, fields){
      res.send(rows);
    });
  });


app.get('/aircraftDelete', function(req, res) {
  var number = req.query.number;
  var deleteQuery1 = `delete from aircraft where no='${number}'`;
  connection.query(deleteQuery1,
    function (err, rows, fields){
      res.send(rows);
    });
  });



// app.get('/flightInsert', function(req, res) {
//   res.sendfile('flightList.html');
// });
//
// app.get('/airInsert', function(req, res) {
//   res.sendfile('flightList.html');
// });






// app.get('/dbSelect', function(req, res) {
//   var selectQuery3 = `select * from news`;
//
//   connection.query(selectQuery3,
//   function (err, rows, fields){
//     res.send(rows);
//   })
// });
