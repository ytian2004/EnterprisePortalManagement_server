var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var UserRouter = require('./routes/admin/UserRouter')
var NewsRouter = require('./routes/admin/NewsRouter')
var ProductRouter = require('./routes/admin/ProductRouter')
var WebNewsRouter = require('./routes/web/NewsRouter')
var WebProductRouter = require('./routes/web/ProductRouter')
var JWT = require("./util/JWT")

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use(WebNewsRouter)
app.use(WebProductRouter)

/*
 /adminapi/* 后台系统用
 /webapi/* 企业官网用
*/
// 用户表注册
app.use((req,res,next)=>{
  // token有效，next()
  // token过期，返回401
  // 首次登录排除掉，因为没有token
  // 登录接口排除掉，因为登录接口没有token
  if(req.url==="/adminapi/user/login"){
    next()
    return;
  }
  const token = req.headers["authorization"].split(" ")[1];
  if(token){
    const payload = JWT.verify(token)
    if(payload){
      const newToken = JWT.generate({
        _id:payload._id,
        username:payload.username
      },"1d") 
      res.header("authorization",newToken)
      next()
    }else{
      res.status(401).send({
        errCode: -1,
        errorInfo: "token过期"
      })
    }
  
  }

})
app.use(UserRouter);
app.use(NewsRouter)
app.use(ProductRouter)



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

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
