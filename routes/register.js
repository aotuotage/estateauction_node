var express = require('express');
var router = express.Router();
var pool = require("../mysql");
var userSQL = require("../db/usersql");

/* GET users listing. */
router.post('/', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3001");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    console.log(req.body);
    //连接数据库
    var data = {};
    pool.getConnection(function (err, connection) {
        // 获取前台页面传过来的参数
        var UserName = req.body.username;
        var Password = req.body.password;
        var _res = res;
        connection.query(userSQL.queryAll, function (err, res, result) {
            var isTrue = false;
            if(res){ //获取用户列表，循环遍历判断当前用户是否存在
                for (var i=0;i<res.length;i++) {
                    console.log(res[i])
                    if(res[i].userName == UserName) {
                        isTrue = true;
                    }
                }
            }
            data.isreg = !isTrue; //如果isTrue布尔值为true则登陆成功 有false则失败
            if(isTrue) {
                data.result = {
                    code: 1,
                    msg: '用户已存在'
                };//登录成功返回用户信息
            } else {
                connection.query(userSQL.insert, [req.body.username,req.body.password], function (err, result) {
                    if(result) {
                        data.result = {
                            code: 200,
                            msg: '注册成功'
                        };
                    } else {
                        data.result = {
                            code: -1,
                            msg: '注册失败'
                        };
                    }
           
                })
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