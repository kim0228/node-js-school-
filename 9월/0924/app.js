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
  res.sendfile(__dirname + '/index.html');
});

// http.listen(3000, function(){
//   console.log('listening on *:3000');
// });


// io.emit('some event',{for: 'everyone'});

// io.on('connection',function(socket){
//   socket.broadcast.emit('hi');
// });
//
// io.on('connection',function(socket){
//   socket.on('chat message',function(msg){
//     console.log('message: ' + msg);
//   });
// });

/////////////////////////////////form.html///////////////////////////////////

app.get('/form', function(req, res){
  res.sendfile(__dirname + '/form.html');
});


//////////////////////////////socket.io//////////////////////////////////////
var users = [{userName:"test1", socketId:"testId"}];
var io = require('socket.io').listen(server);

// 적은 아이디가 중복인지 아닌지 확인하고 로그인하는 부분
app.post('/logincheck',function(req, res){
  // console.log("before", users);
  var userName = req.body.userName;
  for (var i = 0;i<users.length;i++){
    if(users[i].userName == userName){
      res.send('notok');
      return;
    }
  }
  // console.log("after", users);
  res.send('ok');
});



io.on('connection',function(socket){

  // 채팅 메시지
  socket.on('chat message',function(msg){
    // console.log(msg);
    for (var i = 0;i<users.length;i++){
        if(users[i].socketId==socket.id){
          // console.log(users[i].userName);
          msg.userName = users[i].userName;
        }
    }

    socket.broadcast.to("chatroom").emit('newChatMsg', msg)
    console.log(msg, msg.userName);
    var insertQuery = `insert message (name, msg) values("${msg.userName}","${msg.msg}")`;
    connection.query(insertQuery,
    function (err, rows, fields){
      if (err) throw err;
    }) // 보낸 메시지를 나를 제외한 모든 클라이언트에게 보내준다.
  });

  // 접속한 사용자들을 같은 그룹으로 조인시키는 부분
  socket.on('joinRoom',function(userName){
    socket.join("chatroom");
    var usersNames = [];
    for(var i = 0;i<users.length;i++){
      usersNames.push(users[i].userName)
    }
    // console.log(users.length, usersNames)
    socket.emit('getConnectedUsers',usersNames);

    socket.broadcast.to("chatroom").emit('newUserConnected',userName);
    users.push({userName:userName, socketId:socket.id});
    // console.log("login", users);

    // var selectQuery = `select * from message`;
    // connection.query(selectQuery,
    // function (err, rows, fields){
    //   if (err) throw err;
    //   res.send(rows);
    // })

  });


  // 연결 끊을 때 실행
  socket.on('disconnect',function(){
    for (var i = 0; i<users.length; i++){
      if(users[i].socketId==socket.id){
        // console.log(users[i]);
        socket.broadcast.to('chatroom').
        emit('someoneDisconnected',users[i].userName);
        users.splice(i,1);
        break;
      }
    }
     console.log("logout", users);
  });
});
