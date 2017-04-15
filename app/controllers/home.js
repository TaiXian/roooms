var express = require('express'),
  router = express.Router(),
  Message = require('../models/message');

var Connection = require('tedious').Connection;
var Request = require('tedious').Request;

// Create connection to database
var config = {
  userName: 'bandeenj', // update me
  password: 'rooomsW0rld', // update me
  server: 'roomsdb.database.windows.net', // update me
  options: {
      database: 'rooomsdb', //update me
      encrypt: true
  }
};


function queryDatabase(connection, roomNumber, res){
    var messageRows = [];
    console.log('Reading rows from the Table...');

    // Read all rows from table
    request = new Request(
        "Select * from messages where RoomNumber = " + roomNumber,
        function(err, rowCount, rows) {
            console.log(rowCount + ' row(s) returned');
            res.render('room', {
              roomNumber: roomNumber,
              userName: 'bandje',
              messages: messageRows
            });
        }
    );

    request.on('row', function(columns) {
        var message = {};
        columns.forEach(function(column) {
            message[column.metadata.colName] = column.value;
        });
        messageRows.push(new Message(message));
    });

    connection.execSql(request);
};

function insertIntoDatabase(connection, userName, content, roomNumber, res){
    var messageRows = [];
    console.log("Inserting a brand new product into database...");
    var query = "insert into messages (UserName, Content, RoomNumber) Values ('"+userName+"', '"+content+"', '"+roomNumber+"') Select * from messages where RoomNumber = " + roomNumber;
    console.log(query);
    request = new Request(
        query,
        function(err, rowCount, rows) {
            console.log(rowCount + ' row(s) inserted');
            res.render('room', {
              roomNumber: roomNumber,
              userName: userName,
              messages: messageRows
            });
        }
    );
    request.on('row', function(columns) {
        var message = {};
        columns.forEach(function(column) {
            message[column.metadata.colName] = column.value;
        });
        messageRows.push(new Message(message));
    });
    connection.execSql(request);
};


module.exports = function (app) {
  app.use('/', router);
};

router.get('/', function (req, res, next) {
    res.render('index', {});
});
router.get('/room/:number', function (req, res, next) {
  var connection = new Connection(config);
  // Attempt to connect and execute queries if connection goes through
  connection.on('connect', function(err) {
      if (err) {
          console.log(err);
      }
      else{
          queryDatabase(connection, req.params.number, res);
      }
  });
});

router.post('/room/:number', function (req, res, next) {
  var connection = new Connection(config);

  // Attempt to connect and execute queries if connection goes through
  connection.on('connect', function(err) {
      if (err) {
          console.log(err)
      }
      else{
          insertIntoDatabase(connection, req.body.userName, req.body.content, req.params.number, res);
      }
  });
});
