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
    //连接数据库
    var data = {};
    pool.getConnection(function (err, connection) {
        // 获取前台页面传过来的参数
        var UserName = req.body.username;
        var Password = req.body.password;
        connection.query(userSQL.queryAll, function (err, _res, result) {
            var isTrue = false;
            if(_res){ //获取用户列表，循环遍历判断当前用户是否存在
                for (var i=0;i<_res.length;i++) {
                    if(_res[i].userName == UserName && _res[i].password == Password) {
                        isTrue = true;
                    }
                }
            }
            data.isLogin = isTrue;
            if(isTrue) {
                data.userInfo = {};
                data.userInfo.uid = UserName;
                data.userInfo.userName = Password;
            }
            if(err) data.err = err;
            req.session.isLogin = isTrue;
            req.session.UserName=req.body.username;
            req.session.Password=req.body.password;         
            console.log(req.session)
        
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify(data));
            // 释放链接
            connection.release();
        });
    });
});
module.exports = router;

