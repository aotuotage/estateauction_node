var express = require('express');
var router = express.Router();
var pool = require("../mysql");
var session = require('express-session');
var userSQL = require("../db/usersql");
//登出
router.get('/', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3001");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    console.log(req.query)
  
    delete req.session;
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify(data));
});

module.exports = router;