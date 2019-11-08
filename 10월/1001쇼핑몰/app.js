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

// 쇼핑 파일들
app.get('/', function(req, res){
  res.sendfile(__dirname +'/main.html');
});

app.get('/order', function(req, res){
  res.sendfile(__dirname +'/order.html');
});

app.get('/admin', function(req, res){
  res.sendfile(__dirname +'/admin.html');
});

app.get('/manageItem', function(req, res){
  res.sendfile(__dirname +'/manageItem.html');
});

app.get('/manageOrder', function(req, res){
  res.sendfile(__dirname +'/manageorder.html');
});

app.get('/page', function(req, res){
  res.sendfile(__dirname +'/paging.html');
});

///////////////////////////////////////////////////////////////////////////////
app.get('/selectItems',function(req, res){
  var selectQuery = `select * from item`;
  connection.query(selectQuery,
    function (err, rows, fields){
      if (err) throw err;
      res.send(rows);
    })
});


app.get('/selectItem', function(req, res){
  var no = req.query.no;
  var selectQuery = `select * from item where no = ${no}`;
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
  // console.log(itemNo);
  // console.log(quantity);
  var insertQuery = `insert into ordertable (itemNo, quantity, id) values (${itemNo},${quantity},"${id}")`;
  connection.query(insertQuery,
  function(err,rows,fields){
    if (err) throw err;
    // console.log(rows);
  });
  //////////////////////////////////////////////////////////////////////////////////////////////////
  var updateQuery = `update item set inventory=inventory-${quantity} where no = ${itemNo}`;
  console.log(updateQuery);
  connection.query(updateQuery,
  function(err,rows,fields){
    if (err) throw err;
    console.log(rows);
    res.send(rows);
  });
});

app.post('/updateItem', function(req, res){
  var itemNo = req.body.no;
  var name = req.body.name;
  var price = req.body.price;
  var inventory = req.body.inventory;
  var onSale = req.body.onSale;
  var updateQuery = `update item set name="${name}", price=${price},
  inventory=${inventory}, onsale=${onSale} where no=${itemNo}`;
  // console.log(updateQuery);
  connection.query(updateQuery,
  function(err,rows,fields){
    if (err) throw err;
    res.send(rows);
  });
});

app.post('/insertItem', function(req, res){
  var name = req.body.name;
  var price = req.body.price;
  var inventory = req.body.inventory;
  var onSale = req.body.onSale;
  var insertQuery = `insert into item (name, price, inventory, onsale)
  values ("${name}",${price},${inventory},${onSale})`;
  // console.log(insertQuery);
  connection.query(insertQuery,
  function(err,rows,fields){
    if (err) throw err;
    res.send(rows);
  });
});
/////////////////////////////////////manageOrder.html//////////////////////////////////////////
app.get('/joinOrderItem', function(req, res){
  var selectQuery = `
  select a.no, a.itemNo, a.id, a.complete, a.quantity, a.date,
  b.name, b.price, b.inventory
  from ordertable as a left join item as b
  on a.itemNo = b.no;
`;
  connection.query(selectQuery,
  function(err,rows,fields){
    if (err) throw err;
    res.send(rows);
  });
});

app.post('/cancelOrder', function(req, res){ // 주문 취소
  var no = req.body.no;
  var itemNo = req.body.itemNo;
  var quantity = req.body.quantity;
  var updateQuery = `update ordertable set complete = 2 where no = ${no}`;
  console.log(updateQuery);
  connection.query(updateQuery,
  function(err,rows,fields){
    if (err) throw err;
    // res.send(rows);
  });
  // 주문이 취소됨에 따라
  var updateQuery2 = `update item set inventory = inventory + ${quantity} where no = ${itemNo}`;
  console.log(updateQuery2);
  connection.query(updateQuery2,
  function(err,rows,fields){
    if (err) throw err;
    res.send(rows);
  });

});

app.post('/completeOrder', function(req, res){
  var no = req.body.no;
  var updateQuery = `update ordertable set complete = 1 where no = ${no}`;
  console.log(updateQuery);
  connection.query(updateQuery,
  function(err,rows,fields){
    if (err) throw err;
    res.send(rows);
  });
});
//////////////////////////////////////////////////////////////////////////////////
app.get('/pagingItem', function(req, res){
  var pageCount = req.query.pageCount;
  var selectQuery = `select * from item order by no desc limit ${pageCount*10}, 10`;
  connection.query(selectQuery,
  function(err,rows,fields){
    if (err) throw err;
    res.send(rows);
  });
});

app.get('/countItem', function(req, res){
  var countQuery = `select count(*) as count from item`;
  connection.query(countQuery,
  function(err,rows,fields){
    if (err) throw err;
    res.send(rows);
  });
});



//////////////////////////////////////////////////////////////////////////////
