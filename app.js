var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var RedisStore = require('connect-redis')(session);
var logger = require('morgan');
var pool = require("./mysql");
var cors = require('cors');
//路由文件
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var aboutRouter = require('./routes/about');
var aboutaddRouter = require('./routes/aboutadd');
var newsRouter = require('./routes/newslist');
var problemRouter = require('./routes/problem');
var loginRouter = require('./routes/login');
var logoutRouter = require('./routes/logout');
var registerRouter = require('./routes/register');
var buylandRouter = require('./routes/buyland');
var buylistRouter = require('./routes/buylist');
var userbackRouter = require('./routes/userback');
var app = express();

// 插入数据  
pool.getConnection(function (err,connection) { // 使用连接池  
  if(err){  
      console.log('与MySQL数据库建立连接失败！');  
      console.log('错误信息为：' + err);  
  }  
  else{  
      console.log('与MsSQL数据库建立连接成功！');  
  }  
});  
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//session储存
app.use(cookieParser());
var options = {
  host: '127.0.0.1',
  port: 6379,
  db: 1,
  prefix: 'ID:' 
}
 const hour = 1000 * 60 * 60;
 var sessionOpts = {
  store: new RedisStore(options),
  // 设置密钥
  secret: 'a cool secret',
  resave: true,
  saveUninitialized: true,
  key: 'myapp_sid',
  cookie: { maxAge: hour * 8, secure: false }
}
app.use(session(sessionOpts)) 
  
app.use(express.static(path.join(__dirname, 'public')));
//应用路由
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/about', aboutRouter);
app.use('/aboutadd', aboutaddRouter);
app.use('/newslist', newsRouter);
app.use('/problem', problemRouter);
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);
app.use('/register', registerRouter);
app.use('/buyland', buylandRouter);
app.use('/buylist', buylistRouter);
app.use('/userback', userbackRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});
//设置跨域
var corsOptions = {
  origin: 'http://localhost:3001',
  credentials: true,
  maxAge: '1728000'
  //这一项是为了跨域专门设置的
}
app.use(cors(corsOptions))
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
