var express = require('express');
var router = express.Router();
var pool = require("../mysql");
var userSQL = require("../db/usersql");

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3001");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    //从数据库读取数据
    var data = {};
    pool.getConnection(function (err, connection) {
        var _res = res;
        connection.query(userSQL.problemqueryAll, function (err,res) {
            data.list = []
            if(res){ 
                for (var i=0;i<res.length;i++) {
                    data.list.push(res[i].list)
                }
            }
            if(err) data.err = err;
            _res.writeHead(200, {'Content-Type': 'application/json'});
            _res.end(JSON.stringify(data));
            // 释放链接
            connection.release();
        });
    });
});

module.exports = router;