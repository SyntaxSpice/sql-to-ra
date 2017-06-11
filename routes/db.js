var mysql = require('mysql');
var express = require('express');
var http = require('http');
var request = require('request');
var router = express.Router();

var connection = mysql.createConnection({
    host: 'us-cdbr-iron-east-03.cleardb.net',
    user: 'b01bbb2737cdec',
    password: '6f56489d',
    database: 'heroku_f5b419f4259a71b'
});

connection.connect();
router.post('/sql', function (req, res) {
    console.log(req.body);
    let sqlReq = req.body.data.toLowerCase();
    if (~sqlReq.indexOf("drop") || ~sqlReq.indexOf("insert")) {
        res.send("Don't try change database!");
    } else {
        try {
            connection.query(req.body.data, function (err, rows, fields) {
                if (!err) {
                    console.log('The solution is: ', rows);
                    res.send(rows);
                } else {
                    res.send("Your request is incorrect!");
                    console.log('Error while performing Query.');
                }
            });
        } catch (err) {
            res.send("Your request is incorrect!");
            console.log(err);
        }
        //        connection.end();
    }
});


module.exports = router;