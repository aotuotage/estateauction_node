var express = require('express');
var router = express.Router();
var pool = require("../mysql");
var body = require('body-parser');
var userSQL = require("../db/usersql");
/* GET users listing. */
router.post('/', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3001");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    let reqbody = req.body;
    console.log(reqbody);
    pool.getConnection(function (err, connection) {
        connection.query(userSQL.insertProblem,JSON.stringify(reqbody), function (err, _res) {
            if(_res){

            }else{
              
            }
            console.log(_res)
            var reqtext = {
                states:200,
                msg:"我们已经收到您的意见，会尽快回复您！"
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
