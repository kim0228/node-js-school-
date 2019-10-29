var express = require('express');
var http = require('http');
var app = express();
var server = http.createServer(app).listen(80);
var mysql = require('mysql');
var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');


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

// ---------------------------------엑셀--------------------------------
const Excel = require('exceljs/modern.nodejs');

// app.get('/makeExcelFile', function (req, res) {
//   var workbook = new Excel.Workbook();
//   var sheet = workbook.addWorksheet('menu');
//   var cell = sheet.getCell('C3').value = "abc";
//   workbook.xlsx.writeFile('menu.xlsx').then(function() {
//     });
// 	res.send("res");
// });

app.post('/menuExcel', function (req, res){ 
  var workbook = new Excel.Workbook();
  var sheet = workbook.addWorksheet('menu');

  var reqParam = JSON.parse(req.body.reqParam);
  var menu = reqParam.menu;
  var scores = reqParam.scores;

  var currentLine = 1;
  sheet.getCell('A' + currentLine).value = `월`;
  sheet.getCell('C' + currentLine).value = `화`;
  sheet.getCell('E' + currentLine).value = `수`;
  sheet.getCell('G' + currentLine).value = `목`;
  sheet.getCell('I' + currentLine).value = `금`;
  currentLine++;
  var longestMenuCnt = 0;
  for (var i = 0;i<menu.length;i++){
    if(longestMenuCnt <= menu[i].length){
      longestMenuCnt = menu[i].length;
    }
  }

  for(var i = 0;i<longestMenuCnt;i++){
    for(var j = 0;j<5;j++){
      if(menu[j][i]){
        var cell1, cell2;
        if(j==0) cell1 = 'A', cell2 = 'B';
        if(j==1) cell1 = 'C', cell2 = 'D';
        if(j==2) cell1 = 'E', cell2 = 'F';
        if(j==3) cell1 = 'G', cell2 = 'H';
        if(j==4) cell1 = 'I', cell2 = 'J';
        sheet.getCell(cell1 + currentLine).value = menu[j][i];
        sheet.getCell(cell2 + currentLine).value = scores[j][i];
      }
    }
    currentLine++;
  }
  currentLine++;
////////////////////////////////////////////////////////////////////////////

  sheet.getCell('A' + currentLine).value = `평균`;
  sheet.getCell('C' + currentLine).value = `평균`;
  sheet.getCell('E' + currentLine).value = `평균`;
  sheet.getCell('G' + currentLine).value = `평균`;
  sheet.getCell('I' + currentLine).value = `평균`;

  for (var i = 0;i<scores.length;i++){
    var avg = 0;
    for(var j = 0;j<scores[i].length;j++){
      avg += scores[i][j];
    }
    avg /= scores[i].length;
    if(i==0) cell1 = 'B';
    if(i==1) cell1 = 'D';
    if(i==2) cell1 = 'F';
    if(i==3) cell1 = 'H';
    if(i==4) cell1 = 'J';
    sheet.getCell(cell1 + currentLine).value = avg;
  }

  sheet.autoFilter = {// 엑셀파일에서 분류를 해주는 filter를 생성하게 해준다.
    from: 'A1',
    to: 'J1',
  };

  workbook.xlsx.writeFile('excel.xlsx').then(function(){
    res.send(200);
  });
});

app.get('/getExcelFile', function (req, res) {// 파일이 다운로드된다.
  res.setHeader('Content-type','application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  res.setHeader("Content-Disposition", "attachment; filename = excel.xlsx");

  res.sendfile(__dirname + '/excel.xlsx',function(err){
    fs.unlinkSync(__dirname + '/excel.xlsx');
  })
});
