var mysql = require('mysql');
var express = require('express');
var http = require('http');
var request = require('request');
var router = express.Router();

var db_config = {
    host: 'us-cdbr-iron-east-03.cleardb.net',
    user: 'b01bbb2737cdec',
    password: '6f56489d',
    database: 'heroku_f5b419f4259a71b'
};


router.post('/sql', function (req, res) {
    console.log(req.body);
    let sqlReq = req.body.data.toLowerCase();
    if (~sqlReq.indexOf("drop") || ~sqlReq.indexOf("insert")) {
        res.send("Don't try change database!");
    } else {
        try {
            connection.query(req.body.data, function (err, rows, fields) {
                if (!err) {
                    res.send({data:rows, status: 200});
                } else {
                    res.send({data: null, message: "Your request is incorrect!"});
                    console.log('Error while performing Query.');
                }
            });
        } catch (err) {
            res.send({data: null, "message": "Your request is incorrect!"});
            console.log(err);
        }
                
    }
});

var connection;

function handleDisconnect() {
  connection = mysql.createConnection(db_config); 
  connection.connect(function(err) {              
    if(err) {                                
      console.log('error when connecting to db:', err);
      setTimeout(handleDisconnect, 2000);
    }
  });             
  connection.on('error', function(err) {
    console.log('db error', err);
    if(err.code === 'PROTOCOL_CONNECTION_LOST') {
      handleDisconnect();
    } else {
      throw err;
    }
  });
}

handleDisconnect();


module.exports = router;