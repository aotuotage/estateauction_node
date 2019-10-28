var express = require('express');
var router = express.Router();
var request = require('request');
var cheerio = require('cheerio');
var session = require('express-session');
var iconv = require('iconv-lite');

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3001");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Credentials', true);
    var sess = req.session;   
    console.log(sess);
    //爬取观点网站
    request({
      url:    'http://www.guandian.cn/',   // 请求的URL
      method: 'GET',                   // 请求方法
      encoding: null,
      headers: {                       // 指定请求头
        'Content-Type': 'text/html; charset=utf-8',
        'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8'        // 指定 Accept-Language
      }
    }, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        var title=[];
        var img =[]; 
        var $ = cheerio.load(body.toString());
        //标题信息
        $(".con_l_down_r").each(function(i, e) {
          var buf = $(e).find(".eas").text();
          var brief = $(e).find("p").text();
          var time = $(e).find("#keyword").children("span").text();
          let obj = {
            href:$(e).find(".eas").attr("href"),
            title:buf,
            brief:brief,
            time:time
          }
          title.push(obj)  
          if(i==7){
            return false
          }
        });
        //图片img
        $(".con_l_down_photo a img").each(function(i, e) {
          let obj = {
            img:$(e).attr("src")
          }
          img.push(obj)  
          if(i==7){
            return false
          }
        });
        //返回数据
        var reqtext = {
          states:200,
          msg:"success",
          list: {
            title:title,
            img:img
          }
      }
      res.writeHead(200, {'Content-Type': 'application/json'});
      res.end(JSON.stringify(reqtext));
      }
    });
});

module.exports = router;
