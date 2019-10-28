var express = require('express');
var router = express.Router();
var pool = require("../mysql");
var session = require('express-session');
var userSQL = require("../db/usersql");

/* GET users listing. */
router.post('/', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3001");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Credentials', true);
    let reqbody = req.body;
    pool.getConnection(function (err, connection) {
        connection.query(userSQL.insertlist,JSON.stringify(reqbody), function (err, _res) {
            if(_res){

            }else{
              
            }
            console.log(_res)
            var reqtext = {
                states:200,
                msg:"提交成功"
            }
            if(err) reqtext.err = err;
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify(reqtext));
            // 释放链接
            connection.release();
        });
    });
});

module.exports = router;